<script lang="ts">
  import { page } from '$app/stores';

    import PostDetail from "$lib/component/PostDetail.svelte";
    const serviceDetail = {
      id:"b68e116a-cfed-4ec2-8f66-352b682b0ad2",
  title: "Electrician for Home Repairs",
  description: "Fixing lights, sockets, and wiring in Kathmandu.",
  price: "1500",
  imageUrl: "https://source.unsplash.com/400x300/?electrician,tools",
  bids: [
    {
      user: "John Doe",
      amount: "1400",
      message: "Can do this tomorrow afternoon."
    },
    {
      user: "Jane Smith",
      amount: "1350",
      message: "Experienced electrician, can complete in 1 day."
    }
  ]
}



</script>

<div>
    <PostDetail {...serviceDetail}/>
</div>
