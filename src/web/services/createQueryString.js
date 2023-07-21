export const createQueryString = (queryParams) => {
    let queryString = "";

    Object.entries(queryParams).map(([key, value]) => {
      if (Array.isArray(value)) {
        value.map((param) => (
          queryString += key + "=" + param.value + "&"
        ));
      }

      if (typeof value === "number" && value > 0) {
        queryString += key + "=" + value + "&";
      }

      if (typeof value === "boolean") {
        queryString += key + "=" + value + "&";
      }

      if (typeof value === "string" && value.length > 0) {
        queryString += key + "=" + value + "&";
      }
    });

    return queryString;
  };