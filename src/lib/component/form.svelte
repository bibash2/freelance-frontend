<script lang="ts">
    import Button from "./button.svelte";
    interface IForm {
        label: string;
        name: string;
        type: string;
        placeholder: string;
    }

    const props : IForm = $props();
    const { label, name, type, placeholder } = props;
</script>

<form action="">
    <label for="{name}">{label}</label>
    <input type="{type}" name="{name}" placeholder="{placeholder}" />
    <Button label="Submit" variant="default" size="medium" />
</form>
    