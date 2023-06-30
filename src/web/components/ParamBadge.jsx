import styles from "@/styles/components/ParamBadge.module.css";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ParamBadge = (props) => {
  const { label, appliedQueryParams, queryKey, handleAppliedQueryParams } = props;

  return (
    <>
      {Array.isArray(appliedQueryParams[queryKey]) &&
        appliedQueryParams[queryKey].map(({ name, value }, index) => (
          <p
            key={index}
            className={styles.filterBadge}
            onClick={() => handleAppliedQueryParams(queryKey, value, name)}
          >
            {label} : {name}
            <XMarkIcon className={styles.filterBadgeIcon} />
          </p>
        ))}

      {typeof appliedQueryParams[queryKey] === "boolean" && (
        <p
          className={styles.filterBadge}
          onClick={() =>
            handleAppliedQueryParams(queryKey, appliedQueryParams[queryKey])
          }
        >
          {label}
          <XMarkIcon className={styles.filterBadgeIcon} />
        </p>
      )}

      {typeof appliedQueryParams[queryKey] === "number" && (
        <p
          className={styles.filterBadge}
          onClick={() => handleAppliedQueryParams(queryKey, 0)}
        >
          {label} : {appliedQueryParams[queryKey]}
          <XMarkIcon className={styles.filterBadgeIcon} />
        </p>
      )}

      {typeof appliedQueryParams[queryKey] === "string" && (
        <p
          className={styles.filterBadge}
          onClick={() => handleAppliedQueryParams()}
        >
          {label} price :{" "}
          {appliedQueryParams[queryKey] === "asc"
            ? "low to high"
            : "high to low"}
          <XMarkIcon className={styles.filterBadgeIcon} />
        </p>
      )}
    </>
  );
};

export default ParamBadge;