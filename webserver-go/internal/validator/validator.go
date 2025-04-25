// validation one-off
// reduce boilerplate code

package validator

import (
	"strings"
	"unicode/utf8"
)

type Validator struct {
	FieldErrors map[string]string
}

func (v *Validator) Valid() bool {
	return len(v.FieldErrors) == 0
}

func (v *Validator) AddFiledError(key, message string) {

	// initialize the map if not exists

	if v.FieldErrors == nil {
		v.FieldErrors = make(map[string]string)
	}

	// add
	if _, exists := v.FieldErrors[key]; !exists {
		v.FieldErrors[key] = message
	}

}

func (v *Validator) CheckField(ok bool, key, message string) {
	if !ok {
		v.AddFiledError(key, message)
	}
}

func NotBlank(value string) bool {
	return strings.TrimSpace(value) != ""
}

func MaxChars(value string, n int) bool {
	return utf8.RuneCountInString(value) <= n
}
