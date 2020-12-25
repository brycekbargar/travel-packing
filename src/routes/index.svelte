<script context="module">
    import { setContext } from 'svelte'
</script>
<script>

    let username: string;
    $: setContext('currentUser', username);

    let password: string;

    function signup() { alert('Signup'); }
</script>

<div id="login-container">
    <form on:submit|preventDefault="{() => window.location.href = "/checklist"}">
        <fieldset>
            <legend><h3>Login</h3></legend>

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
</div>

<style>
    #login-container { @apply
        flex
        justify-center
    }

    form { @apply
        flex
        flex-col
        content-center
        shadow-md
        m-4
        p-4
    }

    fieldset { @apply
        flex
        flex-col
        p-3
    }

    h3 { @apply
        text-lg
    }

    input { @apply
        max-w-sm
    }

    form span { @apply
        flex
        justify-around
    }

    button { @apply
        w-20
    }

    button[type="submit"] { @apply
		dark:bg-green-800
		bg-green-400
    }
</style>