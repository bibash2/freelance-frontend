<script lang="ts">
    import { goto } from '$app/navigation';
    import toast from '$lib/component/toast.svelte'
    const user = true;
    

    const handleFindHelp = ()=>{
        try {
           if(user){
            goto('/dashboard');
           }else{
            goto('/register');
           }
        }catch (error) {
            console.log(error);
        }
    }

    const handleOfferService = ()=>{
        try {
            if(user){
                goto('/dashboard');
            }else{
                goto('/register');
            }
        } catch (error) {
            console.log(error);
        }
    }
   
    const popularServices = [
      { name: "Plumber", icon: "🚰" },
      { name: "Electrician", icon: "🔌" },
      { name: "Carpenter", icon: "🪚" },
      { name: "Painter", icon: "🎨" },
      { name: "AC Repair", icon: "❄️" },
      { name: "Mason", icon: "🧱" }
    ];
  
    const locations = [
      "Kathmandu", "Pokhara", "Biratnagar", "Birgunj", "Dhulikhel", "Lalitpur", "Bharatpur", "Butwal", "Chitwan", "Dhulikhel"
    ];
  
    const testimonials = [
      {
        quote: "Found a reliable plumber in 30 minutes when my pipe burst at midnight!",
        author: "Ramesh S., Baneshwor"
      },
      {
        quote: "Earning 50% more since joining MarketPlace. Clients come to me now!",
        author: "Sunita M., Electrician"
      }
    ];
  </script>
  
  <section class="bg-white text-gray-800 font-sans">
    <!-- Navigation with Nepali touch -->
    <nav class="container mx-auto px-4 py-3 flex justify-between items-center border-b">
      <div class="flex items-center">
        <span class="text-2xl font-bold text-red-600">MarketPlace</span>
        <span class="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">नेपाल</span>
      </div>
      <div class="hidden md:flex space-x-1">
        <button 
          on:click={handleFindHelp}
          class="px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          Find Service
        </button>
        <button 
          on:click={handleOfferService}
          class="px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          Offer Service
        </button>
      </div>
      <div class="flex items-center space-x-2">
        <span class="hidden sm:inline">🇳🇵</span>
        <button class="p-2 rounded-full bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </nav>
  
    <!-- Hero Section with Nepali context -->
    <div class="container mx-auto px-4 py-12 md:py-20">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 mb-10 md:mb-0">
          <h1 class="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Find Trusted <span class="text-red-600">Local Service</span> Professionals in Nepal
          </h1>
          <p class="text-lg text-gray-600 mb-8">
            Connect with verified plumbers, electricians, carpenters and more in your area. 
            <span class="font-semibold">100% Nepali service providers.</span>
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button 
              on:click={handleFindHelp}
              class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md"
            >
              Find Help Now
            </button>
            <button 
              on:click={handleOfferService}
              class="px-6 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              Earn Money
            </button>
          </div>
          
          <!-- Popular service tags -->
          <div class="mt-8">
            <p class="text-sm text-gray-500 mb-2">Popular services:</p>
            <div class="flex flex-wrap gap-2">
              {#each popularServices as service}
                <span class="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
                  {service.icon} {service.name}
                </span>
              {/each}
            </div>
          </div>
        </div>
        <div class="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Nepali craftsman at work" 
            class="w-full rounded-xl shadow-lg border border-gray-200"
          />
        </div>
      </div>
    </div>
  
    <!-- Service Areas -->
    <div class="bg-red-50 py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-8">Available in These Cities</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
          {#each locations as city}
            <div class="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition">
              <div class="text-red-600 font-medium">{city}</div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  
    <!-- How It Works -->
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-2xl font-bold text-center mb-2">How MarketPlace Works</h2>
      <p class="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Simple steps to get your problems solved or earn money
      </p>
      
      <div class="grid md:grid-cols-3 gap-8">
        <!-- For Customers -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="font-bold text-lg mb-4 flex items-center">
            <span class="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
            For Customers
          </h3>
          <ol class="space-y-3 list-decimal list-inside text-sm text-gray-700">
            <li>Describe your service need</li>
            <li>Get matched with local professionals</li>
            <li>Compare profiles and prices</li>
            <li>Book and pay securely</li>
            <li>Get your job done</li>
          </ol>
        </div>
        
        <!-- For Service Providers -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="font-bold text-lg mb-4 flex items-center">
            <span class="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
            For Service Providers
          </h3>
          <ol class="space-y-3 list-decimal list-inside text-sm text-gray-700">
            <li>Create your verified profile</li>
            <li>Get service requests in your area</li>
            <li>Set your own rates</li>
            <li>Get paid securely after job completion</li>
            <li>Build your reputation</li>
          </ol>
        </div>
        
        <!-- Benefits -->
        <div class="bg-red-600 text-white p-6 rounded-xl shadow-sm">
          <h3 class="font-bold text-lg mb-4">Why Choose MarketPlace?</h3>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start">
              <svg class="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Verified service professionals
            </li>
            <li class="flex items-start">
              <svg class="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              No middlemen - direct communication
            </li>
            <li class="flex items-start">
              <svg class="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Cashless payments options
            </li>
            <li class="flex items-start">
              <svg class="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Nepali language support
            </li>
          </ul>
        </div>
      </div>
    </div>
  
    <!-- Testimonials -->
    <div class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-12">What Our Users Say</h2>
        <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {#each testimonials as testimonial}
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div class="text-yellow-400 mb-3">★★★★★</div>
              <p class="italic text-gray-700 mb-4">"{testimonial.quote}"</p>
              <p class="font-medium text-sm">— {testimonial.author}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  
    <!-- Final CTA -->
    <div class="bg-red-600 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Ready to Solve or Get Work?</h2>
        <p class="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of Nepalis using MarketPlace for their daily service needs
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            on:click={handleFindHelp}
            class="px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition shadow-md"
          >
            Find Service Provider
          </button>
          <button 
            on:click={handleOfferService}
            class="px-8 py-3 border border-white text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Register as Provider
          </button>
        </div>
      </div>
    </div>
  
    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="text-xl font-bold mb-4 flex items-center">
              <span>MarketPlace</span>
              <span class="ml-2 text-xs bg-gray-700 px-2 py-1 rounded">नेपाली</span>
            </div>
            <p class="text-gray-400 text-sm">
              Connecting skilled Nepali workers with local customers since 2023
            </p>
          </div>
          <div>
            <h3 class="font-semibold mb-3">Services</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              {#each popularServices as service}
                <li><a href="#" class="hover:text-white">{service.name}</a></li>
              {/each}
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-3">Cities</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              {#each locations.slice(0,5) as city}
                <li><a href="#" class="hover:text-white">{city}</a></li>
              {/each}
            </ul>
          </div>
          <div>
            <h3 class="font-semibold mb-3">Contact</h3>
            <ul class="space-y-2 text-sm text-gray-400">
              <li>Kathmandu, Nepal</li>
              <li>+977 98XXXXXXXX</li>
              <li>hello@MarketPlace.com</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} MarketPlace. All rights reserved.
        </div>
      </div>
    </footer>
  </section>