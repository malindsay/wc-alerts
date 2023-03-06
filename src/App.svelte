<svelte:options tag="wc-alerts" immutable={true} />
<script>
  import { onMount } from "svelte";
  import imageFile from './alerts.png'

  let title = "Loading ...";
  onMount(() => {
    console.log('WC Alerts onMount hit!');
    setTimeout(() => {
      title = "Alerts";
    }, 2000);
  });
</script>
<div class="main">
  <h4 class="heading-title">{title}</h4>
  {#if title !== "Loading ..."}
    <img src={imageFile} height="250" alt="alerts"/>
  {/if}
</div>
<style>
  .main {
    margin-left: 15px;
  }
</style>