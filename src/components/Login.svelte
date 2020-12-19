<script>
    let username = '';
    let password = '';

    function login() { alert('Login'); }
    function signup() { alert('Signup'); }
</script>

<form on:submit|preventDefault="{login}">
    <fieldset>
        <label for="username">Username</label>
        <input type="email" required
            id="username" name="username"
            bind:value="{username}" />
        <label for="password">Password</label>
        <input type="password" required
            id="password" name="password"
            bind:value="{password}" />
    </fieldset>
    <span>
        <button type="submit">Login</button>
        <button type="button" on:click="{signup}">Signup</button>
    </span>
</form>
