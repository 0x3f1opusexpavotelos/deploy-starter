import { db } from "./db";
import type { User } from "./user";
const SESSION_EXPIRES_IN = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

interface Session {
  id: string;
  expiresAt: Date;
}

// const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

function validateSession(sessionId: string): SessionValidationResult {
  // 1. 检查会话是否存在
  const session = getSessionFromStorage(sessionId);
  if (!session) {
    return false;
  }

  const now = new Date();

  // 2. Check if session has expired
  if (now > session.expiresAt) {
    return false;
  }

  // 3.  Renew session if within the renewal window

  // renewal threshold
  const renewalThreshold = new Date(
    session.expiresAt.getTime() - SESSION_EXPIRES_IN / 2
  );

  // after halfExpiryWindow
  if (now > renewalThreshold) {
    // Renew session: Extend expiration by full duration from current time
    const newExpiresAt = new Date(now.getTime() + SESSION_EXPIRES_IN);
    session.expiresAt = newExpiresAt;
    updateSessionExpiration(session.id, newExpiresAt);
  }

  return session;
}

function getSessionFromStorage(sessionId) {
  const row = db.queryOne(
    `
        SELECT session.id, session.user_id, session.expires_at, user.id, user.github_id, user.email, user.username FROM session
        INNER JOIN user ON session.user_id = user.id
        WHERE session.id = ?
    `,
    [sessionId]
  );
  return row;
}

function updateSessionExpiration(sessionId, newExpiredAt) {
  db.execute("UPDATE session SET expires_at = ? WHERE session.id = ?", [
    newExpiredAt,
    sessionId,
  ]);
}

type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

/*
func validateSession(sessionId string) (*Session, error) {
	session, ok := getSessionFromStorage(sessionId)
	if !ok {
		return nil, errors.New("invalid session id")
	}
	if time.Now().After(session.ExpiresAt) {
		return nil, errors.New("expired session")
	}
	if time.Now().After(session.expiresAt.Sub(sessionExpiresIn / 2)) {
		session.ExpiresAt = time.Now().Add(sessionExpiresIn)
		updateSessionExpiration(session.Id, session.ExpiresAt)
	}
	return session, nil
}
*/
