<script lang="ts">
  // export let provider: {
  //   id: number;
  //   name: string;
  //   category: string;
  //   location: string;
  //   phone: string;
  //   bio: string;
  //   profileImage: string;
  // };
  import { freelanceAxios } from '$lib/action/axios.service';
  import { page } from '$app/stores';
  const {id:serviceProviderId} = $page.params;
  console.log(serviceProviderId)

  let showReviewForm = false;
  let reviewComment = "";
  let reviewRating = 0;
  

  const handleReviewSubmit = async () => {
    const response = await freelanceAxios.post("/review", {
      message: reviewComment,
      rating: reviewRating,
      serviceProviderId
    });
    console.log(response.data);
  };

  let ratings = {
    average: 4.7,
    count: 42,
    reviews: [
      {
        id: 1,
        user: "Sarah Johnson",
        rating: 5,
        comment:
          "Excellent service! Fixed my plumbing issue quickly and professionally.",
        date: "2023-05-15",
      },
      {
        id: 2,
        user: "Michael Brown",
        rating: 4,
        comment: "Good work but arrived 30 minutes later than scheduled.",
        date: "2023-04-28",
      },
      {
        id: 3,
        user: "Amina Mohammed",
        rating: 5,
        comment: "Highly recommend! Very knowledgeable and fair pricing.",
        date: "2023-03-10",
      },
    ],
  };

  const provider = {
    id: 1,
    name: "John Doe",
    category: "Plumber",
    location: "Lagos",
    phone: "+234 701 123 4567",
    bio: "Experienced plumber with over 10 years of residential and commercial plumbing services. Specializes in pipe installation, leak repairs, and bathroom fittings. Committed to providing quality service with a smile.",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    services: [
      "Pipe Installation",
      "Leak Repair",
      "Drain Cleaning",
      "Water Heater Service",
      "Bathroom Fitting",
      "Emergency Plumbing",
    ],
    ratings: {
      average: 4.7,
      count: 42,
      reviews: [
        {
          id: 1,
          user: "Sarah Johnson",
          rating: 5,
          comment:
            "John fixed our kitchen leak in no time! Professional and courteous. Will definitely call him again for any plumbing needs.",
          date: "2023-05-15",
          userImage: "https://randomuser.me/api/portraits/women/33.jpg",
        },
        {
          id: 2,
          user: "Michael Brown",
          rating: 4,
          comment:
            "Good work but arrived 30 minutes later than scheduled. The quality of work was excellent though.",
          date: "2023-04-28",
          userImage: "https://randomuser.me/api/portraits/men/45.jpg",
        },
        {
          id: 3,
          user: "Amina Mohammed",
          rating: 5,
          comment:
            "Highly recommend! Fixed our complex bathroom plumbing issue that others couldn't solve. Very knowledgeable and fair pricing.",
          date: "2023-03-10",
          userImage: "https://randomuser.me/api/portraits/women/63.jpg",
        },
        {
          id: 4,
          user: "David Wilson",
          rating: 5,
          comment:
            "Exceptional service! Installed new pipes throughout our house. Clean work and cleaned up after himself. 10/10 would recommend.",
          date: "2023-02-22",
          userImage: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        {
          id: 5,
          user: "Grace Okon",
          rating: 3,
          comment:
            "Did a decent job fixing our leak, but forgot to bring some tools and had to make a second trip. Work was good once completed.",
          date: "2023-01-15",
          userImage: "https://randomuser.me/api/portraits/women/44.jpg",
        },
      ],
    },
    availability: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      hours: "8:00 AM - 6:00 PM",
      emergency: true,
    },
    experience: "10+ years",
    languages: ["English", "Yoruba"],
    certification: "Licensed Master Plumber",
    insurance: true,
  };
</script>

<div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
  <!-- Header Section -->
  <div class="md:flex p-6">
    <!-- Profile Image -->
    <div class="md:flex-shrink-0 mr-6">
      <img
        class="h-48 w-48 object-cover rounded-full border-4 border-red-100"
        src={provider.profileImage}
        alt={provider.name}
      />
    </div>

    <!-- Profile Info -->
    <div class="mt-4 md:mt-0">
      <div class="uppercase tracking-wide text-sm text-red-600 font-semibold">
        {provider.category}
      </div>
      <h1 class="block mt-1 text-2xl leading-tight font-bold text-gray-900">
        {provider.name}
      </h1>

      <div class="mt-4 flex items-center">
        <div class="flex items-center">
          {#each Array(5) as _, i}
            {#if i < Math.floor(ratings.average)}
              <svg
                class="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                ></path>
              </svg>
            {:else if i < ratings.average}
              <svg
                class="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <defs>
                  <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                    <stop offset="50%" stop-color="currentColor"></stop>
                    <stop offset="50%" stop-color="#D1D5DB"></stop>
                  </linearGradient>
                </defs>
                <path
                  fill="url(#half-star)"
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                ></path>
              </svg>
            {:else}
              <svg
                class="w-5 h-5 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                ></path>
              </svg>
            {/if}
          {/each}
          <span class="ml-2 text-gray-600"
            >{ratings.average} ({ratings.count} reviews)</span
          >
        </div>
      </div>

      <div class="mt-4 space-y-2">
        <div class="flex items-center text-gray-600">
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span>📍 Location: {provider.location}</span>
        </div>

        <div class="flex items-center text-gray-600">
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            ></path>
          </svg>
          <span>📞 Phone: {provider.phone}</span>
        </div>
      </div>

      <div class="mt-4">
        <h3 class="text-lg font-semibold text-gray-800">📝 About Me</h3>
        <p class="mt-2 text-gray-600">{provider.bio}</p>
      </div>
    </div>
  </div>

  <!-- Services Offered Section -->
  <div class="px-6 py-4 border-t border-gray-200">
    <h2 class="text-xl font-bold text-gray-800">Services Offered</h2>
    <div class="mt-4 flex flex-wrap gap-2">
      <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
        >Pipe Installation</span
      >
      <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
        >Leak Repair</span
      >
      <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
        >Drain Cleaning</span
      >
      <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
        >Water Heater Service</span
      >
    </div>
  </div>

  <!-- Reviews Section -->
  <div class="px-6 py-4 border-t border-gray-200">
    <h2 class="text-xl font-bold text-gray-800">Customer Reviews</h2>

    {#each ratings.reviews as review}
      <div class="mt-4 py-4 border-b border-gray-200 last:border-b-0">
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-semibold text-gray-900">{review.user}</h4>
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
          <span class="text-sm text-gray-500">{review.date}</span>
        </div>
        <p class="mt-2 text-gray-600">{review.comment}</p>
      </div>
    {/each}
    {#if showReviewForm}
  <form
    on:submit|preventDefault={() => {
      // TODO: Call API or update ratings locally
      console.log({ rating: reviewRating, comment: reviewComment });
      showReviewForm = false;
    }}
    class="mt-4 space-y-4"
  >
    <!-- Rating Input -->
    <div class="flex items-center">
      <label class="mr-4 text-gray-700">Your Rating:</label>
      {#each [1,2,3,4,5] as star}
        <svg
          class="w-6 h-6 cursor-pointer {reviewRating >= star ? 'text-yellow-400' : 'text-gray-300'}"
          fill="currentColor"
          viewBox="0 0 20 20"
          on:click={() => reviewRating = star}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
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
      on:click={() => handleReviewSubmit()}
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
    >
      Contact {provider.name}
    </button>
  </div>
</div>
