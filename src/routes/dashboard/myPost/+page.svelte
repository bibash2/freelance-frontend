<script lang="ts">
    import ServiceCard from '$lib/component/servicePost.svelte';
    import { goto } from '$app/navigation';
    import ServiceProviderProfile from '$lib/component/serviceProviderProfile.svelte';
    import { onMount } from 'svelte';
    let viewByMe=true;
    import { freelanceAxios } from '$lib/action/axios.service';
    import { browser } from '$app/environment';

    const showPostDetails = (id: string) => {
    goto('/dashboard/post/'+id)
  };


//     const services = [
//   {
//     id: 1,
//     title: 'Electrician for Home Repairs',
//     description: 'Fixing lights, sockets, and wiring in Kathmandu area.',
//     price: '1500',
//     imageUrl: 'https://source.unsplash.com/400x300/?electrician,tools',
//   },
//   {
//     id: 2,
//     title: 'Plumber Service',
//     description: 'Leak fixes, pipe installation, and bathroom fitting support.',
//     price: '1200',
//     imageUrl: 'https://source.unsplash.com/400x300/?plumber,water',
//   },
//   {
//     id: 3,
//     title: 'House Cleaning',
//     description: 'Deep cleaning services available in Lalitpur and Bhaktapur.',
//     price: '1000',
//     imageUrl: 'https://source.unsplash.com/400x300/?cleaning,home',
//   },
//   {
//     id: 4,
//     title: 'Electrician for Home Repairs',
//     description: 'Fixing lights, sockets, and wiring in Kathmandu area.',
//     price: '1500',
//     imageUrl: 'https://source.unsplash.com/400x300/?electrician,tools',
//   },
//   {
//     id: 5,
//     title: 'Plumber Service',
//     description: 'Leak fixes, pipe installation, and bathroom fitting support.',
//     price: '1200',
//     imageUrl: 'https://source.unsplash.com/400x300/?plumber,water',
//   },
//   {
//     id: 6,
//     title: 'House Cleaning',
//     description: 'Deep cleaning services available in Lalitpur and Bhaktapur.',
//     price: '1000',
//     imageUrl: 'https://source.unsplash.com/400x300/?cleaning,home',
//   },
//   {
//     id: 7,
//     title: 'Electrician for Home Repairs',
//     description: 'Fixing lights, sockets, and wiring in Kathmandu area.',
//     price: '1500',
//     imageUrl: 'https://source.unsplash.com/400x300/?electrician,tools',
//   },
//   {
//     id: 8,
//     title: 'Plumber Service',
//     description: 'Leak fixes, pipe installation, and bathroom fitting support.',
//     price: '1200',
//     imageUrl: 'https://source.unsplash.com/400x300/?plumber,water',
//   },
//   {
//     id: 9,
//     title: 'House Cleaning',
//     description: 'Deep cleaning services available in Lalitpur and Bhaktapur.',
//     price: '1000',
//     imageUrl: 'https://source.unsplash.com/400x300/?cleaning,home',
//   },
//   {
//     id: 10,
//     title: 'Electrician for Home Repairs',
//     description: 'Fixing lights, sockets, and wiring in Kathmandu area.',
//     price: '1500',
//     imageUrl: 'https://source.unsplash.com/400x300/?electrician,tools',
//   },
//   {
//     id: 11,
//     title: 'Plumber Service',
//     description: 'Leak fixes, pipe installation, and bathroom fitting support.',
//     price: '1200',
//     imageUrl: 'https://source.unsplash.com/400x300/?plumber,water',
//   },
//   {
//     id: 12,
//     title: 'House Cleaning',
//     description: 'Deep cleaning services available in Lalitpur and Bhaktapur.',
//     price: '1000',
//     imageUrl: 'https://source.unsplash.com/400x300/?cleaning,home',
//   },
// ];

let services:any = [];
onMount( async () => {
    try {
        const response = await freelanceAxios.get("/my-post");
        console.log(response.data);
        services = response.data;
    } catch (error) {
        console.log(error);
    }
});
  
</script>

<section class="py-10 px-4 bg-gray-50">

    <div class="max-w-7xl mx-auto">
        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {#each services as service (service.id)}
                <ServiceCard {...service}on:click={() => showPostDetails(service.id)} />
            {/each}
        </div>
    </div>
</section>