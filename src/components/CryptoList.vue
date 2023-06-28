<template>
  <div>
    <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" class="fw-bold">Name</th>
          <th scope="col" class="d-none d-md-table-cell fw-bold">Price</th>
          <th scope="col" class="d-none d-md-table-cell fw-bold">Volume 24h</th>
          <th scope="col" class="fw-bold">Change</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="crypto in cryptos" :key="crypto.id">
          <td><img :src="crypto.logo" alt="logo" /></td>
          <td class="align-middle">{{ crypto.name }}</td>

          <td class="d-none d-md-table-cell align-middle">
            {{ crypto.quote.USD.price }} USD
          </td>
          <td class="d-none d-md-table-cell align-middle">
            {{ crypto.quote.USD.volume_24h }}
          </td>
          <td>
            <span
              v-if="crypto.quote.USD.percent_change_24h > 0"
              class="green-arrow align-middle fs-3"
              >&#8593;</span
            >
            <span
              v-else-if="crypto.quote.USD.percent_change_24h === 0"
              class="align-middle"
            ></span>
            <span v-else class="red-arrow align-middle fs-3">&#8595;</span>
            {{ crypto.quote.USD.percent_change_24h.toFixed() }}%
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import bitIcon from '@/components/icons/bitcoin.png';

export default {
  data() {
    return {
      cryptos: [],
      loading: false,
      icon: bitIcon,
    };
  },
  methods: {
    async loadCryptos() {
      this.loading = true;
      try {
        const response = await axios.get(
          'http://localhost:8080/cryptocurrency/listings/latest-with-logos',
          {
            params: { start: this.cryptos.length + 1, limit: 20 },
          }
        );

        const cryptos = response.data.data;

        this.cryptos = this.cryptos.concat(cryptos);
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.loadCryptos();
      }
    });
    this.loadCryptos();
  },
};
</script>
<style scoped>
.green-arrow {
  color: green;
}
.red-arrow {
  color: red;
}
img {
  width: 2.5rem;
}
</style>
