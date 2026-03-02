import useBaseUrl from "@docusaurus/useBaseUrl";
import Link from "@docusaurus/Link";

import styles from "@site/src/css/Features.module.css";

import clsx from "clsx";

function FeatureDial({ url, imgUrl, text, dial, ...props }) {
  let classes = clsx(
    "button",
    { "button--primary": props.index },
    { "button--secondary": !props.index },
    props.classes,
    styles.featureButton,
    { [styles.featureButtonIndex]: props.index },
  );

  const width = props?.width ?? "120px";

  return (
    <div className={styles.featureDial}>
      <Link to={url} className={classes}>
        <div className={styles.featureSvg}>
          <img src={useBaseUrl(imgUrl)} style={{ width: width }} alt={props.alt ?? text} />
        </div>
        <div>{text}</div>
      </Link>
      <div className={styles.featureDialContent}>
        {dial.map((item, idx) => (
          <div
            key={idx}
            className={styles.featureDialItem}
            style={{ "--feature-item-index": idx }}
          >
            <div>
              <img src={useBaseUrl(item.imgUrl)} style={{ width: "40px" }} alt={item.alt ?? item.text} />
            </div>
            <div>
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureDial;
