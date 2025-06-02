<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import ServiceCard from "$lib/component/servicePost.svelte";
  import ServiceProviderProfile from "$lib/component/serviceProviderProfile.svelte";
  import DetailView from "$lib/component/PostDetail.svelte";
  let viewAllPosts = $state(true);
  import plumberImg from "./plumber.png";
  import painterImg from "./painter.png";
  import hairDresserImg from "./hairdresser.png";
  import { browser } from "$app/environment";
  import { freelanceAxios } from "$lib/action/axios.service";
  let serviceProviders: any = $state([]);
  let showPost = $state(true);

  let selectedItem: any;
  let userDetail: any = $state();
  let location = $state("");

  let services: any = $state([]);

  onMount(async () => {
    if (browser) {
      userDetail = JSON.parse(localStorage.getItem("userDetail") || "{}");
      if(!userDetail?.role.includes("SERVICE_PROVIDER")) showPost = false;
    }
    if(!userDetail?.role.includes("SERVICE_PROVIDER")){
      const response = await freelanceAxios.get("/service-provider-list");
      serviceProviders = response.data;
    }else{
      const response = await freelanceAxios.get("/post-list");
      services = response.data;
    }
    
  });

  let showSuggestions = $state(true);
  let locationSuggestions: string[] = $state([]);
  const categories = ["Plumber", "Electrician", "Carpenter", "Mechanic"];

  const getServiceProvider = async () => {
    showPost = false;
    const response = await freelanceAxios.get("/service-provider-list");
    serviceProviders = response.data;
  };

  const showPostDetails = (id: string) => {
    goto("/dashboard/post/" + id);
  };

  const showServiceProviderDetails = (id: string) => {
    goto("/dashboard/serviceProvider/" + id);
  };

  // const services = [
  //   {
  //     title: "Electrician for Home Repairs",
  //     description: "Fixing lights, sockets, and wiring in Kathmandu area.",
  //     price: "1500",
  //     imageUrl: plumberImg,
  //     change:true,
  //     id:1
  //   },
  //   {
  //     title: "Plumber Service",
  //     description:
  //       "Leak fixes, pipe installation, and bathroom fitting support.",
  //     price: "1200",
  //     imageUrl: hairDresserImg,
  //     id:2
  //   },
  //   {
  //     title: "House Cleaning",
  //     description:
  //       "Deep cleaning services available in Lalitpur and Bhaktapur.",
  //     price: "1000",
  //     imageUrl: painterImg,
  //     id:3
  //   },
  //   {
  //     title: "Electrician for Home Repairs",
  //     description: "Fixing lights, sockets, and wiring in Kathmandu area.",
  //     price: "1500",
  //     imageUrl: hairDresserImg,
  //     id:4

  //   },
  //   {
  //     title: "Plumber Service",
  //     description:
  //       "Leak fixes, pipe installation, and bathroom fitting support.",
  //     price: "1200",
  //     imageUrl: plumberImg,
  //     id:5
  //   },
  //   {
  //     title: "House Cleaning",
  //     description:
  //       "Deep cleaning services available in Lalitpur and Bhaktapur.",
  //     price: "1000",
  //     imageUrl: plumberImg,
  //     id:6
  //   },
  //   {
  //     title: "Electrician for Home Repairs",
  //     description: "Fixing lights, sockets, and wiring in Kathmandu area.",
  //     price: "1500",
  //     imageUrl: plumberImg,
  //     id:7
  //   },
  //   {
  //     title: "Plumber Service",
  //     description:
  //       "Leak fixes, pipe installation, and bathroom fitting support.",
  //     price: "1200",
  //     imageUrl: plumberImg,
  //     id:8
  //   },
  //   {
  //     title: "House Cleaning",
  //     description:
  //       "Deep cleaning services available in Lalitpur and Bhaktapur.",
  //     price: "1000",
  //     imageUrl: plumberImg,
  //     id:9
  //   },
  //   {
  //     title: "Electrician for Home Repairs",
  //     description: "Fixing lights, sockets, and wiring in Kathmandu area.",
  //     price: "1500",
  //     imageUrl: "https://source.unsplash.com/400x300/?electrician,tools",
  //     id:10
  //   },
  //   {
  //     title: "Plumber Service",
  //     description:
  //       "Leak fixes, pipe installation, and bathroom fitting support.",
  //     price: "1200",
  //     imageUrl: "https://source.unsplash.com/400x300/?plumber,water",
  //     id:11
  //   },
  //   {
  //     title: "House Cleaning",
  //     description:
  //       "Deep cleaning services available in Lalitpur and Bhaktapur.",
  //     price: "1000",
  //     imageUrl: "https://source.unsplash.com/400x300/?cleaning,home",
  //     id:12
  //   },
  //   // Add more services as needed
  // ];

  // export const serviceProviders = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     category: "Plumber",
  //     location: "Lagos",
  //     phone: "+234 701 123 4567",
  //     bio: "Experienced plumber with over 10 years of residential and commercial plumbing services.",
  //     profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     category: "Electrician",
  //     location: "Abuja",
  //     phone: "+234 802 987 6543",
  //     bio: "Certified electrician offering affordable and safe installations.",
  //     profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Emeka Obi",
  //     category: "Carpenter",
  //     location: "Enugu",
  //     phone: "+234 813 222 3344",
  //     bio: "Craftsman with a passion for building and repairing furniture.",
  //     profileImage: "https://randomuser.me/api/portraits/men/54.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Chioma Eze",
  //     category: "Cleaner",
  //     location: "Port Harcourt",
  //     phone: "+234 805 678 9012",
  //     bio: "Professional cleaner with attention to detail and reliability.",
  //     profileImage: "https://randomuser.me/api/portraits/women/65.jpg",
  //   },
  //   {
  //     id: 5,
  //     name: "Ahmed Sule",
  //     category: "Mechanic",
  //     location: "Kano",
  //     phone: "+234 809 111 2233",
  //     bio: "Auto mechanic with expertise in engine diagnostics and repairs.",
  //     profileImage: "https://randomuser.me/api/portraits/men/76.jpg",
  //   },
  //   {
  //     id: 6,
  //     name: "Lola Ade",
  //     category: "Painter",
  //     location: "Ibadan",
  //     phone: "+234 802 223 4455",
  //     bio: "Creative interior and exterior painter available for home projects.",
  //     profileImage: "https://randomuser.me/api/portraits/women/58.jpg",
  //   },
  //   {
  //     id: 7,
  //     name: "Tunde Afolabi",
  //     category: "Electrician",
  //     location: "Benin City",
  //     phone: "+234 812 456 7890",
  //     bio: "Electrical technician with experience in wiring, lighting, and smart systems.",
  //     profileImage: "https://randomuser.me/api/portraits/men/88.jpg",
  //   },
  //   {
  //     id: 8,
  //     name: "Blessing Nwankwo",
  //     category: "Hair Stylist",
  //     location: "Owerri",
  //     phone: "+234 814 333 7788",
  //     bio: "Passionate hair stylist with 6+ years in salon services.",
  //     profileImage: "https://randomuser.me/api/portraits/women/70.jpg",
  //   },
  //   {
  //     id: 9,
  //     name: "Samuel Ikenna",
  //     category: "AC Technician",
  //     location: "Jos",
  //     phone: "+234 806 999 0001",
  //     bio: "Cooling expert for split and central air conditioning systems.",
  //     profileImage: "https://randomuser.me/api/portraits/men/23.jpg",
  //   },
  //   {
  //     id: 10,
  //     name: "Grace Olayemi",
  //     category: "Tailor",
  //     location: "Ilorin",
  //     phone: "+234 703 765 4321",
  //     bio: "Fashion designer offering custom clothing and adjustments.",
  //     profileImage: "https://randomuser.me/api/portraits/women/33.jpg",
  //   },
  // ];

  const selectLocation = async (loc: string) => {
    location = loc;
    showSuggestions = false;
    locationSuggestions = [];
    console.log(location, "location");
    // const response = await freelanceAxios.get(`/post-list?address=${location}&category=${userDetail?.category}`);
    // services = response.data;
  };

  const filterLocation = async (location: string) => {
    if(showPost){
      const response = await freelanceAxios.get(`/post-list?address=${location}&category=${userDetail?.category}`);
      services = response.data;
    }else if(!showPost){
      const response = await freelanceAxios.get(`/service-provider-list?address=${location}&category=${userDetail?.category}`);
      serviceProviders = response.data;
    }

    
  };

  const fetchLocationRecommendations = async (location: string) => {
    try {
      const response = await freelanceAxios.post(
        `/get-suggest-location/${location}`,
      );
      locationSuggestions = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  $effect(() => {
    if (location) {
      showSuggestions = true;
      locationSuggestions = [];
      fetchLocationRecommendations(location);
    }
  });
</script>

<section class="py-10 px-4 bg-gray-50">
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-wrap justify-between items-start mb-6 gap-4">
      <!-- 🔴 Left Side: Buttons -->
      <div class="flex flex-wrap gap-2">
        {#if userDetail?.role.includes("SERVICE_PROVIDER")}
          <button
            class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
            onclick={() => (showPost = true)}
          >
            Browse Posts
          </button>
        {/if}
        <button
          class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
          onclick={() => getServiceProvider()}
        >
          Browse Service Providers
        </button>
        <button
          onclick={() => goto("/form/post-service")}
          class="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition"
        >
          Post Service
        </button>
      </div>

      <!-- 🔵 Right Side: Search Input -->
      <div class="relative w-full sm:w-64">
        <label class="block mb-1 text-sm font-medium text-gray-700">
          Search Location Wise
        </label>
        <input
          type="text"
          bind:value={location}
          required
          onkeydown={(e) => {
            if (e.key === "Enter") {
              filterLocation(location);
            }
          }}
          class="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {#if showSuggestions && locationSuggestions.length && location}
          <ul
            class="absolute z-50 w-full mt-1 border rounded-md bg-white shadow-md max-h-40 overflow-auto"
          >
            {#each locationSuggestions as loc}
              <li
                class="px-2 py-1 hover:bg-blue-100 cursor-pointer"
                onclick={() => selectLocation(loc)}
              >
                {loc}
              </li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {console.log(services, "services")}
      {#if showPost && userDetail?.role.includes("SERVICE_PROVIDER") && showPost}
        {#if services?.length === 0 || services?.length === undefined}
          <div>
            <p>No services found for {userDetail.category}</p>
          </div>
        {/if}

        {#each services as service (service.id)}
          <ServiceCard
            {...service}
            on:click={() => showPostDetails(service.id)}
          />
        {/each}
      {:else}
        {#each serviceProviders as provider (provider.id)}
          <ServiceProviderProfile
            {...provider}
            on:click={() => showServiceProviderDetails(provider.id)}
          />
        {/each}
      {/if}
    </div>
  </div>
</section>
