import { classnames } from "@/pages/_app";
import styles from "@/styles/components/Toggle.module.css";
import { useCallback, useState } from "react";


const Toggle = (props) => {
	const { onPress, toggled } = props;

	const [isToggled, setIsToggled] = useState(toggled);

	const handleToggler = useCallback(() => {
		onPress(!toggled);
		setIsToggled(!isToggled);
	}, [isToggled, onPress, toggled]);

	return (
		<div
			className={classnames(
				styles.wrapper,
				isToggled ? styles.wrapperToggled : styles.wrapperNotToggled
			)}
			onClick={() => handleToggler()}
		>
			<div
				className={classnames(
					styles.ball,
					isToggled ? styles.toggled : styles.notToggled
				)}
			>
			</div>
		</div>
	);
};

export default Toggle;