package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
)

// dependencies injection

// expose as global variable
// errorLog,database connection pool

type application struct {
	debug    bool
	errorLog *log.Logger
	infoLog  *log.Logger
}

// serve static file

// run through path.clean() function before searching for file.
// this removes any . and ... element from the URL path, which  help stops directory traversal attacks

// last-modified header are set for response sent file to client
// if file hasn't changed since the user last requested it. will send a 304 Not Modified status code instead of file itself
// reduce latency and processing overhead

// the content-type is set for you by runthrough mime.TypeByEextension() function

func snippetView(w http.ResponseWriter, r *http.Request) {

	// set the content-type header for you by content sniffing the response body
	// with the http.DetectContentType() function, will fallback to Content-Type: application/octet-stream if cannot decide

	// header map
	// header normalize run through textproto.CanonicalMIMEHEaderKey()
	w.Header().Set("Content-Type", "application/json")
	// edit the header map directly to bypass header normalize
	w.Header()["X-XSS-Protection"] = []string{"1; mode=block"}
	// suppressing generated header
	w.Header()["Date"] = nil

}

func snippetCreate(w http.ResponseWriter, r *http.Request) {

	// retrive the value from query parameter
	id := r.URL.Query().Get("id")

	// http.ResponseWriter  satisfies the`io.Writer` type cause it has a w.Write() method
	fmt.Fprintf(w, "display a specific snippet with id :%s", id)
}

/*
*
  - 1. passing  the runtime configuration settings for the application
  - 2. Inject the dependencies
  - 3. Running the server
*/
func main() {

	// manage configuration. seprate configuration from code
	// store secret and env variable
	// store all configuration in single struct

	addr := flag.String("addr", ":4000", "HTTP network address")
	dsn := flag.String("dsn", "web:pass@/snippetbox?parseTime=true", "DB URL")
	debug := flag.Bool("debug", false, "Enable debug mode")

	flag.Parse()
	// level logging
	// centralized error handling
	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)

	errorLog := log.New(os.Stderr, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)

	db, err := OpenDBConnection(*dsn)
	if err != nil {
		errorLog.Fatal(err)
	}
	defer db.Close()

	app := &application{
		debug:    *debug,
		errorLog: errorLog,
		infoLog:  infoLog,
	}

	srv := &http.Server{
		Addr:     *addr,
		ErrorLog: errorLog,
		Handler:  app.routes(),
	}

	// listen for incoming request
	// listen for network interface if omit

	infoLog.Printf("Starting server on %s", *addr)
	err = srv.ListenAndServe()
	errorLog.Fatal(err)
}

func OpenDBConnection(dsn string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dsn)

	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}
	return db, nil
}
