<script lang="ts">
    import Button from "./button.svelte";
    interface ILoginForm {
        email: string;
        password: string;
    }

    const props : ILoginForm = $props();
    const { email, password } = props;
</script>

<form action="">
    <label for="email">Email</label>
    <input type="email" name="email" placeholder="email" />
    <label for="password">Password</label>
    <input type="password" name="password" placeholder="password" />
    <Button label="Login" variant="default" size="medium" />
</form>