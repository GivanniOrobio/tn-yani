<div class="sort_by">
    <label>Sort by</label>
    <select class="sort-by form-control">
        <option value="manual">Featured</option>
        <option value="best-selling">Best Selling</option>
        <option value="title-ascending">Name: A-Z</option>
        <option value="title-descending">Name: Z-A</option>
        <option value="price-ascending">Price: Low to High</option>
        <option value="price-descending">Price: High to Low</option>
        <option value="created-ascending">Oldest to Newest</option>
        <option value="created-descending">Newest to Oldest</option>
    </select>
</div>
<script>
    Shopify.queryParams = {};
    if (location.search.length) {
        for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
            aKeyValue = aCouples[i].split('=');
            if (aKeyValue.length > 1) {
                Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
            }
        }
    }
    jQuery('.sort-by')
        .val('title-ascending')
        .on('change', function() {
            Shopify.queryParams.sort_by = jQuery(this).val();
            location.search = jQuery.param(Shopify.queryParams);
        });
</script>