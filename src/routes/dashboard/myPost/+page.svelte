<script lang="ts">
    import ServiceCard from '$lib/component/servicePost.svelte';
    import ServiceProviderProfile from '$lib/component/serviceProviderProfile.svelte';
    let viewByMe=true;
    const services = [
      {
        title: 'Electrician for Home Repairs',
        description: 'Fixing lights, sockets, and wiring in Kathmandu area.',
        price: '1500',
        imageUrl: 'https://source.unsplash.com/400x300/?electrician,tools',
      },
      {
        title: 'Plumber Service',
        description: 'Leak fixes, pipe installation, and bathroom fitting support.',
        price: '1200',
        imageUrl: 'https://source.unsplash.com/400x300/?plumber,water',
      },
      {
        title: 'House Cleaning',
        description: 'Deep cleaning services available in Lalitpur and Bhaktapur.',
        price: '1000',
        imageUrl: 'https://source.unsplash.com/400x300/?cleaning,home',
      },
      {
        title: 'Electrician for Home Repairs',
        description: 'Fixing lights, sockets, and wiring in Kathmandu area.',
        price: '1500',
        imageUrl: 'https://source.unsplash.com/400x300/?electrician,tools',
      },
      {
        title: 'Plumber Service',
        description: 'Leak fixes, pipe installation, and bathroom fitting support.',
        price: '1200',
        imageUrl: 'https://source.unsplash.com/400x300/?plumber,water',
      },
      {
        title: 'House Cleaning',
        description: 'Deep cleaning services available in Lalitpur and Bhaktapur.',
        price: '1000',
        imageUrl: 'https://source.unsplash.com/400x300/?cleaning,home',
      },
      {
        title: 'Electrician for Home Repairs',
        description: 'Fixing lights, sockets, and wiring in Kathmandu area.',
        price: '1500',
        imageUrl: 'https://source.unsplash.com/400x300/?electrician,tools',
      },
      {
        title: 'Plumber Service',
        description: 'Leak fixes, pipe installation, and bathroom fitting support.',
        price: '1200',
        imageUrl: 'https://source.unsplash.com/400x300/?plumber,water',
      },
      {
        title: 'House Cleaning',
        description: 'Deep cleaning services available in Lalitpur and Bhaktapur.',
        price: '1000',
        imageUrl: 'https://source.unsplash.com/400x300/?cleaning,home',
      },
      {
        title: 'Electrician for Home Repairs',
        description: 'Fixing lights, sockets, and wiring in Kathmandu area.',
        price: '1500',
        imageUrl: 'https://source.unsplash.com/400x300/?electrician,tools',
      },
      {
        title: 'Plumber Service',
        description: 'Leak fixes, pipe installation, and bathroom fitting support.',
        price: '1200',
        imageUrl: 'https://source.unsplash.com/400x300/?plumber,water',
      },
      {
        title: 'House Cleaning',
        description: 'Deep cleaning services available in Lalitpur and Bhaktapur.',
        price: '1000',
        imageUrl: 'https://source.unsplash.com/400x300/?cleaning,home',
      },
      // Add more services as needed
    ];
  
</script>

<section class="py-10 px-4 bg-gray-50">

    <div class="max-w-7xl mx-auto">
        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {#each services as service}
                <ServiceCard {...service} />
            {/each}
        </div>
    </div>
</section>