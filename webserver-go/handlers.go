package main

import (
	"html/template"
	"log"
	"net/http"
)

// handler and handler function
// satisfy the http.handler interface
// to be a handler, an object must have a SeverHTTP method with the exact signature - ServerHTTP(http.ResponseWrite, *http.Request)
// handler function are transform into a handler by using the http.HandlerFunc adapter
// mux.Handle("/", http.HandlerFunc(home))

// as method against the application struct
func (app *application) home(w http.ResponseWriter, r *http.Request) {

	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	// template composition, create base template to share content, avoid type duplication
	// embedding partials reuse across page and layout
	files := []string{
		"./ui/html/base.tmpl",
		"./ui/html/home.tmpl",
	}

	// read files into template set
	ts, err := template.ParseFiles(files...)
	if err != nil {
		log.Printf(err.Error())
		// helper function take error message and status code and call the w.Write() method for us
		http.Error(w, "Service unavailable", http.StatusServiceUnavailable)
		return
	}

}

// server static file
/**
	* StaticDir: path to static Directory
	@example staticDir["/asset"] = "/static"
*/
for prefix, staticDir := range StaticDir {
	// check if the request path starts with the static prefix
	if strings.HasPrefix(r.URL.Path, prefix) {
			file := staticDir + r.URL.Path[len(prefix):]
			http.ServeFile(w,r, file)
			w.started = true
			return
	}
}


/**
	* setup new snippet form
	* parsing form data
	
*/
func (app *application) snippetNew(w http.ResponseWriter, r *http.Request){

	data.Form = 

	app.render(w, httpStatusOk, "NewSnippetForm.tmpl", data)

}


func (app *application) snippetCreate(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()

	if err != nil {
		app.clientError(w, http.StatusBadRequest)
		return 
	}

	// parsing form
	// access/retrive/extract form value via r.PostForm Map
	title := r.PostForm.Get("title")
	content := r.PostForm.Get("content")
	// exceed form body limit size 10MBl

		// expect to be integer
		expires, err := strconv.Atoi(r.PostForm.Get("expires"))
		if er != nil {
			app.clientError(w, http.StatusBadRequest)
			return 
		}
		

	// validate form
	// display form field validation error + repopular field
	form.CheckField(validator.NotBlank(form.Title), "title", "this field cannot be blank")

	if !form.Valid() {
		data := app.newTemplateData(r)
		data.Form = form
		app.render(w, http.StatusUnprocessableEntity, "snippet.new.tmpl", data)
		return
	}


	http.Redirect(w,r, fmt.Sprintf("/snippet/view/%d", id), http.StatusSeeOther)
}






// check session data in memory store or db
// SELECT * FROM sessions where token = ""
// check if found/exists and not expires
// session_id, session_token, cookie_session_key
// add session data to the request context, so it can be used in handler
