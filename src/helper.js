const getSortedList = (snacks, filters) => {
  if (filters.sort === "") return snacks;
  switch (filters.sort) {
    case "id": {
      const sortedSnacks = [...snacks];
      return sortedSnacks.sort((a, b) => parseInt(a.id) - parseInt(b.id));
    }

    case "id_desc": {
      const sortedSnacks = [...snacks];
      return sortedSnacks.sort((a, b) => b.id - a.id);
    }

    case "product_name": {
      const sortedSnacks = [...snacks];
      return sortedSnacks.sort((a, b) => {
        const nameA = a.product_name.toUpperCase();
        const nameB = b.product_name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }

    case "product_name_desc": {
      const sortedSnacks = [...snacks];
      return sortedSnacks.sort((a, b) => {
        const nameA = a.product_name.toUpperCase();
        const nameB = b.product_name.toUpperCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    }

    case "product_weight": {
      const sortedSnacks = [...snacks];
      return sortedSnacks.sort((a, b) => a.product_weight - b.product_weight);
    }

    case "product_weight_desc": {
      const sortedSnacks = [...snacks];
      return sortedSnacks.sort(
        (a, b) => parseInt(b.product_weight) - parseInt(a.product_weight)
      );
    }

    case "price": {
      const sortedSnacks = [...snacks];
      return sortedSnacks.sort((a, b) => a.price - b.price);
    }

    case "price_desc": {
      const sortedSnacks = [...snacks];
      return sortedSnacks.sort((a, b) => b.price - a.price);
    }

    case "calories": {
      const sortedSnacks = [...snacks];
      return sortedSnacks.sort((a, b) => a.calories - b.calories);
    }

    case "calories_desc": {
      const sortedSnacks = [...snacks];
      return sortedSnacks.sort((a, b) => b.calories - a.calories);
    }

    case "ingredients": {
      const sortedSnacks = [...snacks];
      return sortedSnacks.sort((a, b) => {
        const nameA = a.ingredients[0].toUpperCase();
        const nameB = b.ingredients[0].toUpperCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    }

    case "ingredients_desc": {
      const sortedSnacks = [...snacks];
      return sortedSnacks.sort((a, b) => {
        const nameA = a.ingredients[0].toUpperCase();
        const nameB = b.ingredients[0].toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }

    default:
      break;
  }
};

const searchFilter = (snacks, filters) =>
  filters.searchText.trim().length > 0
    ? snacks.filter(
        (snack) =>
          snack.product_name
            .toLowerCase()
            .includes(filters.searchText.trim().toLowerCase()) ||
          snack.ingredients.some((item) =>
            item.toLowerCase().includes(filters.searchText.trim().toLowerCase())
          )
      )
    : snacks;

export const getUpdatedList = (snacks, filters) => {
  const filterFunctions = [searchFilter, getSortedList];
  return filterFunctions.reduce(
    (acc, currFunc) => currFunc(acc, filters),
    snacks
  );
};
