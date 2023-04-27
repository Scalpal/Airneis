import styles from "@/styles/components/ParamBadge.module.css";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ParamBadge = (props) => {
  const { appliedQueryParams, queryKey, handleQueryParamsFilters } = props;

  return (
    appliedQueryParams[queryKey].length > 0 &&
      appliedQueryParams[queryKey].map(({ name, value }, index) => (
        <p
          key={index}
          className={styles.filterBadge}
          onClick={() => handleQueryParamsFilters(queryKey, {name, value})}
        >
          {queryKey} : {name}
          <XMarkIcon className={styles.filterBadgeIcon} />
        </p>
      ))
    
  );
};

export default ParamBadge;