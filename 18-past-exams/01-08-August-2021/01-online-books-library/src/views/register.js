import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/user.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (onRegister) => html`
        <section id="register-page" class="register">
            <form @submit=${onRegister} id="register-form" action="" method="">
                <fieldset>
                    <legend>Register Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
        </section>`


        // <section id="register">
        //   <div class="form">
        //     <h2>Register</h2>
        //     <form @submit=${onRegister} class="login-form">
        //       <input
        //         type="text"
        //         name="email"
        //         id="register-email"
        //         placeholder="email"
        //       />
        //       <input
        //         type="password"
        //         name="password"
        //         id="register-password"
        //         placeholder="password"
        //       />
        //       <input
        //         type="password"
        //         name="re-password"
        //         id="repeat-password"
        //         placeholder="repeat password"
        //       />
        //       <button type="submit">register</button>
        //       <p class="message">Already registered? <a href="/login">Login</a></p>
        //     </form>
        //   </div>
        // </section>`


export function showRegister(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister(data) {
        if(!data.email || !data.password || !data['confirm-pass']) {
            return alert('All fields are required!');
        }

        if(data.password !== data['confirm-pass']) {
            return alert("Passwords don't match!");
        }

        await register(data.email, data.password); // This is the function (login) from 'user.js' file with the request.
        ctx.updateNav();
        ctx.page.redirect('/'); // This will redirect the user to HOME PAGE after successful login (it's written in the task).
    }
}