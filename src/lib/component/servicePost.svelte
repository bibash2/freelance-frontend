<script lang="ts">
   interface IServicePost {
    title: string;
    description: string;
    price: string;
    imageUrl: string;
   }
   let servicePost: IServicePost = $props();
   const { title, description, price, imageUrl } = servicePost;
  </script>
  
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
    <img class="w-full h-44 object-cover" src={imageUrl} alt={title} />
  
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800">{title}</h3>
      <p class="text-sm text-gray-600 mt-1 line-clamp-3">{description}</p>
  
      <div class="mt-4 flex justify-between items-center">
        <span class="text-red-600 font-bold">Rs. {price}</span>
        <button class="bg-red-600 text-white text-sm px-4 py-2 rounded-md hover:bg-red-700 transition">
          Book Now
        </button>
      </div>
    </div>
  </div>
  