# Contract: Contact Form Submission

**Type**: HTTP POST to Formspree endpoint
**Direction**: Browser → Formspree → KechBnb email inbox

---

## Endpoint

```
POST https://formspree.io/f/{FORM_ID}
Content-Type: application/x-www-form-urlencoded
       OR
Content-Type: application/json   (AJAX mode)
```

`{FORM_ID}` is provided by the client after creating a Formspree account.
It is stored in an environment variable `PUBLIC_FORMSPREE_ID` at build time.

---

## Request Payload

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `name` | string | yes | 1–100 characters |
| `phone` | string | yes | 1–20 characters |
| `email` | string | yes | Valid email format |
| `neighborhood` | string | yes | 1–100 characters |
| `num_properties` | string | no | Numeric string, 1–50 |
| `message` | string | no | Max 1000 characters |
| `_language` | string | yes (hidden) | `"fr"` or `"en"` |
| `_gotcha` | string | yes (honeypot) | Must be empty; bots fill it and submission is rejected |

---

## Responses

### Success (200 OK)

```json
{ "next": "https://formspree.io/thanks" }
```

The frontend intercepts this response (AJAX mode) and displays the success message
in the current language without redirecting.

### Validation Error (422 Unprocessable Entity)

```json
{
  "error": "FORM_NOT_FOUND | INACTIVE | EMPTY",
  "field": "email"
}
```

The frontend displays a generic error message and suggests contacting KechBnb directly.

### Rate Limited (429 Too Many Requests)

The frontend displays a "too many attempts" error and suggests contacting by phone.

---

## Fallback Behaviour (no JavaScript)

The form MUST include `action="https://formspree.io/f/{FORM_ID}"` and `method="POST"`
as native HTML attributes. Without JS, the browser performs a standard form POST and
Formspree redirects to its default thank-you page. This satisfies SC-009 (progressive
enhancement).

---

## Success Confirmation

On successful AJAX submission, the form is replaced by a confirmation message:

- **French**: "Merci ! Nous vous contacterons dans les 24 heures."
- **English**: "Thank you! We will contact you within 24 hours."
