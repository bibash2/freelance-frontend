<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    let input: HTMLInputElement;
    const dispatch = createEventDispatcher();
    onMount(() => {
      const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['address'],
      });
  
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        dispatch('select', {
          address: place.formatted_address,
          location: place.geometry?.location?.toJSON(),
        });
      });
    });
  </script>
  
  <input
    bind:this={input}
    type="text"
    placeholder="Enter address"
    class="autocomplete"
  />
  