<script lang="ts">
    interface IButton {
        label: string;
        variant?: Variant;
        size?: Size;
        disabled?: boolean;
        onclick?: () => void;
    }
    
    const props : IButton = $props();
    const { label, variant = 'default', size = 'medium', disabled = false } = props;
    const VARIANTS = ['default', 'danger', 'success', 'warning', 'info'] as const;
    const SIZES = ['small', 'medium', 'large'] as const;
    
    type Variant = typeof VARIANTS[number];
    type Size = typeof SIZES[number];
    
    const variants: Record<Variant, string> = {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        success: 'bg-green-500 text-white hover:bg-green-600',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
        info: 'bg-blue-400 text-white hover:bg-blue-500'
    } as const;

    const sizes: Record<Size, string> = {
        small: 'px-2 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg'
    } as const;

    const variantClass = variants[variant];
    const sizeClass = sizes[size];
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
</script>

<button
    class="rounded-md transition-colors duration-200 {variantClass} {sizeClass} {disabledClass}"
    disabled={disabled}
    type="button"
>
    {label}
</button>