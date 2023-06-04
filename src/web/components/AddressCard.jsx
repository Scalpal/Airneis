import { classnames } from "@/pages/_app";
import styles from "@/styles/components/AddressCard.module.css";
import {
  GlobeEuropeAfricaIcon,
  MapPinIcon as OlMapPinIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";

const AddressCard = (props) => {
  const { address, index } = props;

  return (
    <div
      className={classnames(
        styles.container,
        address.mainAddress ? styles.mainAddress : styles.notMainAddress
      )}
    >
      <p className={styles.title}>
        {address.mainAddress === true ? "Main address" : `Address ${index}`}
      </p>
      <p className={styles.addressText}>
        <OlMapPinIcon className={styles.icon} />
        {address.address}
      </p>
      <p className={styles.regionText}>
        <BuildingOfficeIcon className={styles.icon} />
        {address.region}
      </p>

      <p className={styles.countryText}>
        <GlobeEuropeAfricaIcon className={styles.icon} />
        {address.country}, {address.city}, {address.postalCode}
      </p>

      {address.mainAddress && <MapPinIcon className={styles.mainAddressIcon} />}
    </div>
  );
};

export default AddressCard;