<script lang="ts">

  import { freelanceAxios } from '$lib/action/axios.service';
  import { page } from '$app/stores';
  const {id:serviceProviderId} = $page.params;
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';


  interface Location {
    latitude: number;
    longitude: number;
  }

  interface ServiceProvider {
    id: string;
    name: string;
    email: string;
    userAddress: string;
    location: Location;
    serviceProviderLocation: Location;
    serviceProviderAddress: string;
    isServiceProvider: boolean;
    isAcceptedServiceProvider: boolean;
    userContact: string | null;
    serviceProviderContact: string | null;
    bio: string | null;
    distance: number;
    image:any;
    category:string
  }

  interface Review {
    id: string;
    message: string;
    rating: number;
    userId: string;
    serviceProviderId: string;
    createdAt: string;
    updatedAt: string;
  }

  interface Rating {
    averageRating: number | null;
    allReviews: Review[];
  }

  interface ApiResponse {
    serviceProvider: ServiceProvider;
    rating: Rating;
  }

  let isLoading = $state(true);
  let serviceProvider = $state<ServiceProvider | null>(null);
  let ratings = $state<Rating>({
    averageRating: null,
    allReviews: []
  });
  let showReviewForm = $state(false);
  let reviewComment = $state("");
  let reviewRating = $state(0);

  onMount(async () => {
    try {
      console.log('Fetching service provider with ID:', serviceProviderId);
      const response = await freelanceAxios.get<ApiResponse>(`/service-provider/${serviceProviderId}`);
      console.log('Raw API Response:', response.data);
      serviceProvider = response.data.serviceProvider;
      ratings = response.data.rating;
      console.log('Service Provider Data:', serviceProvider);
      console.log('Ratings Data:', ratings);
    } catch (error) {
      console.error('Error fetching service provider:', error);
    } finally {
      isLoading = false;
    }
  });

  const handleReviewSubmit = async () => {
    try {
      const response = await freelanceAxios.post("/review", {
        message: reviewComment,
        rating: reviewRating,
        serviceProviderId
      });
      console.log(response.data);
      // Refresh the provider data after review
      const updatedResponse = await freelanceAxios.get<ApiResponse>(`/service-provider/${serviceProviderId}`);
      serviceProvider = updatedResponse.data.serviceProvider;
      ratings = updatedResponse.data.rating;
      showReviewForm = false;
      reviewComment = "";
      reviewRating = 0;
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  // let ratings = {
  //   average: 4.7,
  //   count: 42,
  //   reviews: [
  //     {
  //       id: 1,
  //       user: "Sarah Johnson",
  //       rating: 5,
  //       comment:
  //         "Excellent service! Fixed my plumbing issue quickly and professionally.",
  //       date: "2023-05-15",
  //     },
  //     {
  //       id: 2,
  //       user: "Michael Brown",
  //       rating: 4,
  //       comment: "Good work but arrived 30 minutes later than scheduled.",
  //       date: "2023-04-28",
  //     },
  //     {
  //       id: 3,
  //       user: "Amina Mohammed",
  //       rating: 5,
  //       comment: "Highly recommend! Very knowledgeable and fair pricing.",
  //       date: "2023-03-10",
  //     },
  //   ],
  // };

  // const provider = {
  //   id: 1,
  //   name: "John Doe",
  //   category: "Plumber",
  //   location: "Lagos",
  //   phone: "+234 701 123 4567",
  //   bio: "Experienced plumber with over 10 years of residential and commercial plumbing services. Specializes in pipe installation, leak repairs, and bathroom fittings. Committed to providing quality service with a smile.",
  //   profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
  //   services: [
  //     "Pipe Installation",
  //     "Leak Repair",
  //     "Drain Cleaning",
  //     "Water Heater Service",
  //     "Bathroom Fitting",
  //     "Emergency Plumbing",
  //   ],
  //   ratings: {
  //     average: 4.7,
  //     count: 42,
  //     reviews: [
  //       {
  //         id: 1,
  //         user: "Sarah Johnson",
  //         rating: 5,
  //         comment:
  //           "John fixed our kitchen leak in no time! Professional and courteous. Will definitely call him again for any plumbing needs.",
  //         date: "2023-05-15",
  //         userImage: "https://randomuser.me/api/portraits/women/33.jpg",
  //       },
  //       {
  //         id: 2,
  //         user: "Michael Brown",
  //         rating: 4,
  //         comment:
  //           "Good work but arrived 30 minutes later than scheduled. The quality of work was excellent though.",
  //         date: "2023-04-28",
  //         userImage: "https://randomuser.me/api/portraits/men/45.jpg",
  //       },
  //       {
  //         id: 3,
  //         user: "Amina Mohammed",
  //         rating: 5,
  //         comment:
  //           "Highly recommend! Fixed our complex bathroom plumbing issue that others couldn't solve. Very knowledgeable and fair pricing.",
  //         date: "2023-03-10",
  //         userImage: "https://randomuser.me/api/portraits/women/63.jpg",
  //       },
  //       {
  //         id: 4,
  //         user: "David Wilson",
  //         rating: 5,
  //         comment:
  //           "Exceptional service! Installed new pipes throughout our house. Clean work and cleaned up after himself. 10/10 would recommend.",
  //         date: "2023-02-22",
  //         userImage: "https://randomuser.me/api/portraits/men/22.jpg",
  //       },
  //       {
  //         id: 5,
  //         user: "Grace Okon",
  //         rating: 3,
  //         comment:
  //           "Did a decent job fixing our leak, but forgot to bring some tools and had to make a second trip. Work was good once completed.",
  //         date: "2023-01-15",
  //         userImage: "https://randomuser.me/api/portraits/women/44.jpg",
  //       },
  //     ],
  //   },
  //   availability: {
  //     days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  //     hours: "8:00 AM - 6:00 PM",
  //     emergency: true,
  //   },
  //   experience: "10+ years",
  //   languages: ["English", "Yoruba"],
  //   certification: "Licensed Master Plumber",
  //   insurance: true,
  // };
</script>

{#if isLoading}
  <div class="flex justify-center items-center min-h-[400px]">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
  </div>
{:else if !serviceProvider}
  <div class="text-center py-8">
    <p class="text-gray-500">No service provider details available</p>
    <p class="text-sm text-gray-400 mt-2">Debug: serviceProvider is null</p>
  </div>
{:else}
  <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <!-- Header Section -->
    <div class="md:flex p-6">
      <!-- Profile Info -->
      <div class="bg-white  rounded-2xl p-6 flex flex-col md:flex-row items-start gap-6">
        <!-- Profile Image -->
        <img
          src={serviceProvider.image || "/default-avatar.png"}
          alt={serviceProvider.name}
          class="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
        />

        <!-- Info Section -->
        <div class="flex-1">
          <!-- Name -->
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {serviceProvider.name}
          </h1>

          <!-- Ratings -->
          <div class="flex items-center mb-4">
            {#each Array(5) as _, i}
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                class:text-yellow-400={i < Math.floor(ratings.averageRating || 0)}
                class:text-gray-300={i >= Math.floor(ratings.averageRating || 0)}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            {/each}
            <span class="ml-2 text-gray-600 text-sm">
              {ratings.averageRating ? ratings.averageRating.toFixed(1) : 'No'} ({ratings.allReviews.length} reviews)
            </span>
          </div>

          <!-- Location & Distance -->
          <div class="text-gray-700 mb-2">
            <p class="flex items-center">
              📍 <span class="ml-1">{serviceProvider.serviceProviderAddress}</span>
            </p>
            <p class="ml-5 text-sm text-gray-500">
              Distance: {serviceProvider.distance.toFixed(1)} km away
            </p>
          </div>

          <!-- Contact -->
          {#if serviceProvider.serviceProviderContact}
            <div class="text-gray-700 mb-4">
              📞 <span class="ml-1">{serviceProvider.serviceProviderContact}</span>
            </div>
          {/if}

          <!-- Bio -->
          {#if serviceProvider.bio}
            <div>
              <h3 class="text-lg font-semibold text-gray-800">📝 About Me</h3>
              <p class="mt-2 text-gray-600">{serviceProvider.bio}</p>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Services Offered Section -->
    <div class="px-6 py-4 border-t border-gray-200">
      <h2 class="text-xl font-bold text-gray-800">Services Offered</h2>
      <div class="mt-4 flex flex-wrap gap-2">
        {#each serviceProvider?.services || [] as service}
          <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
            {service}
          </span>
        {/each}
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="px-6 py-4 border-t border-gray-200">
      <h2 class="text-xl font-bold text-gray-800">Customer Reviews</h2>

      {#if ratings.allReviews.filter(review => review.rating > 0).length === 0}
        <p class="text-gray-500 mt-4">No reviews yet.</p>
      {:else}
        {#each ratings.allReviews.filter(review => review.rating > 0) as review}
          <div class="mt-4 py-4 border-b border-gray-200 last:border-b-0 flex items-start gap-4">
            <!-- User Image -->
            <img
              src={review.userImage || "/default-avatar.png"}
              alt="User Avatar"
              class="w-12 h-12 rounded-full object-cover border border-gray-300"
            />

            <div class="flex-1">
              <div class="flex justify-between items-start">
                <div>
                  <div class="flex items-center mt-1">
                    {#each Array(5) as _, i}
                      {#if i < review.rating}
                        <svg
                          class="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          ></path>
                        </svg>
                      {:else}
                        <svg
                          class="w-4 h-4 text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          ></path>
                        </svg>
                      {/if}
                    {/each}
                  </div>
                </div>
                <span class="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              {#if review.message}
                <p class="mt-2 text-gray-600">{review.message}</p>
              {/if}
            </div>
          </div>
        {/each}
      {/if}

      {#if showReviewForm}
        <form
          on:submit|preventDefault={handleReviewSubmit}
          class="mt-4 space-y-4"
        >
          <!-- Rating Input -->
          <div class="flex items-center">
            <label class="mr-4 text-gray-700">Your Rating:</label>
            {#each [1, 2, 3, 4, 5] as star}
              <svg
                class="w-6 h-6 cursor-pointer {reviewRating >= star ? 'text-yellow-400' : 'text-gray-300'}"
                fill="currentColor"
                viewBox="0 0 20 20"
                on:click={() => reviewRating = star}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            {/each}
          </div>

          <!-- Comment Input -->
          <div>
            <label class="block text-gray-700">Your Review:</label>
            <textarea
              class="w-full mt-1 p-2 border rounded"
              rows="4"
              bind:value={reviewComment}
              placeholder="Write something nice..."
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Submit Review
          </button>
        </form>
      {/if}

      <button
        class="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        on:click={() => showReviewForm = !showReviewForm}
      >
        {showReviewForm ? 'Cancel' : 'Write a Review'}
      </button>
    </div>

    <!-- Contact Button -->
    <div class="px-6 py-4 bg-gray-50">
      <button
        class="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
        on:click={() => goto('/form/contact-service-provider/' + serviceProvider?.id)}
      >
        Contact {serviceProvider?.name}
      </button>
    </div>
  </div>
{/if}




