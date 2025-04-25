package main

import "net/http"

func (a *application) routes() http.Handler {
	// serve mux act as control handler, instead providing a response itself, it
	// lookup relevant handler based on the request path
	// pass the request to the register handler
	mux := http.NewServeMux()
	// register route
	// routing could base the incoming request domain, path, method, host header

	// transform handle function into handler and register for match path
	http.HandleFunc("/snippet/view", snippetView)

	fileServer := http.FileServer(http.Dir("./ui/static/"))
	// server static assets
	mux.Handle("/static/", http.StripPrefix("/static", fileServer))

	return secureHeaders(mux)
}
