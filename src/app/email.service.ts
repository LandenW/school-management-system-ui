import { Injectable } from '@angular/core'
import { Component, OnInit, Input } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import { isDevMode } from '@angular/core'


@Injectable()
export class EmailService {

    constructor(
        private http: Http
    ) { }

    send(recipient) {
        const url = 'https://aqueous-everglades-19542.herokuapp.com/api/email'
         //const url = `${isDevMode() && 'http://cors-anywhere.herokuapp.com/'}https://api.sendgrid.com/v3/mail/send`
        const body = `<h1>Welcome to this email!</h1>
                    <strong>You have received an email. Hurrah!</strong>
                    Don't eat your children.`
        const subject = 'Sending with SendGrid is Fun'
        const payload = {
            personalizations: [{
                to: [{ email: recipient }]
            }
            ],
            from: { email: 'test@example.com' },
            subject: subject,
            content: [{
                type: 'text/plain',
                value: body
            }]
        }

        this.http
            .post(url, payload)
            .subscribe(
                success => console.log(success),
                error => console.log(error)
            )
    }

}