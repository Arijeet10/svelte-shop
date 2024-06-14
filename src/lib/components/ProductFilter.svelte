<script lang="ts">
	export let handlePriceFilter: (event: Event) => void;
	export let handleRatingFilter: (event: Event) => void;
	export let handleSort: (event: Event) => void;
</script>

<div class="flex items-center justify-between">
	<div class="flex items-center gap-4">
		<div class="flex-1">
			<select on:change={handlePriceFilter} >
				<option value="" class="text-grey">Price</option>
				<option value="100" >Max $100</option>
				<option value="200" >Max $200</option>
				<option value="300" >Max $300</option>
				<option value="400" >Max $400</option>
				<option value="500" >Max $500</option>
				<option value="600" >Max $600</option>
				<option value="700" >Max $700</option>
				<option value="800" >Max $800</option>
				<option value="900" >Max $900</option>
				<option value="1000" >Max $1000</option>
			</select>
		</div>
		<div class="flex-1">
			<select on:change={handleRatingFilter}>
				<option value="" class="text-grey">Ratings</option>
				<option value="4">4 ⭐ & above</option>
				<option value="3">3 ⭐ & above</option>
				<option value="2">2 ⭐ & above</option>
				<option value="1">1 ⭐ & above</option>
			</select>
		</div>
	</div>
	<div class="flex items-center">
		<select on:change={handleSort}>
			<option value="" class="text-grey">Sort</option>
			<option value="price">By Price</option>
			<option value="reviews">By Popularity</option>
		</select>
	</div>
</div>



