<script lang="ts">
  import { goto } from "$app/navigation";
  import ServiceCard from "$lib/component/servicePost.svelte";
  import ServiceProviderProfile from "$lib/component/serviceProviderProfile.svelte";
  import DetailView from "$lib/component/DetailView.svelte";
  let viewAllPosts = true;
  import plumberImg from './plumber.png';
  import painterImg from './painter.png';
  import hairDresserImg from './hairdresser.png';
  let selectedItem: any;
  
  const showDetails = (item: any) => {
    selectedItem = item;
  };


  const services = [
    {
      title: "Electrician for Home Repairs",
      description: "Fixing lights, sockets, and wiring in Kathmandu area.",
      price: "1500",
      imageUrl: plumberImg,
      change:true,
      id:1
    },
    {
      title: "Plumber Service",
      description:
        "Leak fixes, pipe installation, and bathroom fitting support.",
      price: "1200",
      imageUrl: hairDresserImg,
      id:2
    },
    {
      title: "House Cleaning",
      description:
        "Deep cleaning services available in Lalitpur and Bhaktapur.",
      price: "1000",
      imageUrl: painterImg,
      id:3
    },
    {
      title: "Electrician for Home Repairs",
      description: "Fixing lights, sockets, and wiring in Kathmandu area.",
      price: "1500",
      imageUrl: hairDresserImg,
      id:4

    },
    {
      title: "Plumber Service",
      description:
        "Leak fixes, pipe installation, and bathroom fitting support.",
      price: "1200",
      imageUrl: plumberImg,
      id:5
    },
    {
      title: "House Cleaning",
      description:
        "Deep cleaning services available in Lalitpur and Bhaktapur.",
      price: "1000",
      imageUrl: plumberImg,
      id:6
    },
    {
      title: "Electrician for Home Repairs",
      description: "Fixing lights, sockets, and wiring in Kathmandu area.",
      price: "1500",
      imageUrl: plumberImg,
      id:7
    },
    {
      title: "Plumber Service",
      description:
        "Leak fixes, pipe installation, and bathroom fitting support.",
      price: "1200",
      imageUrl: plumberImg,
      id:8
    },
    {
      title: "House Cleaning",
      description:
        "Deep cleaning services available in Lalitpur and Bhaktapur.",
      price: "1000",
      imageUrl: plumberImg,
      id:9
    },
    {
      title: "Electrician for Home Repairs",
      description: "Fixing lights, sockets, and wiring in Kathmandu area.",
      price: "1500",
      imageUrl: "https://source.unsplash.com/400x300/?electrician,tools",
      id:10
    },
    {
      title: "Plumber Service",
      description:
        "Leak fixes, pipe installation, and bathroom fitting support.",
      price: "1200",
      imageUrl: "https://source.unsplash.com/400x300/?plumber,water",
      id:11
    },
    {
      title: "House Cleaning",
      description:
        "Deep cleaning services available in Lalitpur and Bhaktapur.",
      price: "1000",
      imageUrl: "https://source.unsplash.com/400x300/?cleaning,home",
      id:12
    },
    // Add more services as needed
  ];

  export const serviceProviders = [
    {
      id: 1,
      name: "John Doe",
      category: "Plumber",
      location: "Lagos",
      phone: "+234 701 123 4567",
      bio: "Experienced plumber with over 10 years of residential and commercial plumbing services.",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      category: "Electrician",
      location: "Abuja",
      phone: "+234 802 987 6543",
      bio: "Certified electrician offering affordable and safe installations.",
      profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Emeka Obi",
      category: "Carpenter",
      location: "Enugu",
      phone: "+234 813 222 3344",
      bio: "Craftsman with a passion for building and repairing furniture.",
      profileImage: "https://randomuser.me/api/portraits/men/54.jpg",
    },
    {
      id: 4,
      name: "Chioma Eze",
      category: "Cleaner",
      location: "Port Harcourt",
      phone: "+234 805 678 9012",
      bio: "Professional cleaner with attention to detail and reliability.",
      profileImage: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: 5,
      name: "Ahmed Sule",
      category: "Mechanic",
      location: "Kano",
      phone: "+234 809 111 2233",
      bio: "Auto mechanic with expertise in engine diagnostics and repairs.",
      profileImage: "https://randomuser.me/api/portraits/men/76.jpg",
    },
    {
      id: 6,
      name: "Lola Ade",
      category: "Painter",
      location: "Ibadan",
      phone: "+234 802 223 4455",
      bio: "Creative interior and exterior painter available for home projects.",
      profileImage: "https://randomuser.me/api/portraits/women/58.jpg",
    },
    {
      id: 7,
      name: "Tunde Afolabi",
      category: "Electrician",
      location: "Benin City",
      phone: "+234 812 456 7890",
      bio: "Electrical technician with experience in wiring, lighting, and smart systems.",
      profileImage: "https://randomuser.me/api/portraits/men/88.jpg",
    },
    {
      id: 8,
      name: "Blessing Nwankwo",
      category: "Hair Stylist",
      location: "Owerri",
      phone: "+234 814 333 7788",
      bio: "Passionate hair stylist with 6+ years in salon services.",
      profileImage: "https://randomuser.me/api/portraits/women/70.jpg",
    },
    {
      id: 9,
      name: "Samuel Ikenna",
      category: "AC Technician",
      location: "Jos",
      phone: "+234 806 999 0001",
      bio: "Cooling expert for split and central air conditioning systems.",
      profileImage: "https://randomuser.me/api/portraits/men/23.jpg",
    },
    {
      id: 10,
      name: "Grace Olayemi",
      category: "Tailor",
      location: "Ilorin",
      phone: "+234 703 765 4321",
      bio: "Fashion designer offering custom clothing and adjustments.",
      profileImage: "https://randomuser.me/api/portraits/women/33.jpg",
    },
  ];
</script>

<section class="py-10 px-4 bg-gray-50">
  <div class="max-w-7xl mx-auto">
    <div class="flex space-x-4 mb-6">
      <button
        class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
        on:click={() => (viewAllPosts = true)}
      >
        Browse Posts
      </button>
      <button
        class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
        on:click={() => (viewAllPosts = false)}
      >
        Browse Service Providers
      </button>
      <button
      on:click={() => (goto('/form/post-service'))}
      class="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition"
    >
      Post Service
    </button>
    </div>

    {#if selectedItem}
    <!-- Show detailed view -->
    <DetailView item={selectedItem}/>
  {:else}
    <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {#if viewAllPosts}
        {#each services as service (service.id)}
          <ServiceCard {...service} on:click={() => showDetails(service)} />
        {/each}
      {:else}
        {#each serviceProviders as provider (provider.id)}
          <ServiceProviderProfile {...provider} on:click={() => showDetails(provider)} />
        {/each}
      {/if}
    </div>
  {/if}
   
  </div>
</section>
