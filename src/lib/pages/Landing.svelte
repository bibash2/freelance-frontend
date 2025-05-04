<script lang="ts">
    import Button from "../component/button.svelte";
    import { goto } from "$app/navigation";
    let { children } = $props();
    const navigateToLogin = () => goto("/login");
    const navigateToRegister = () => goto("/register");
</script>

<h1>Landing Page</h1>
<Button label="Login" variant="default" size="medium" onclick={navigateToLogin} />
<Button label="Register" variant="default" size="medium" onclick={navigateToRegister} />


{@render children()}

