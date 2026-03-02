import ButtonContainer from "./ButtonContainer";
import FeatureButton from "./FeatureButton";
import FeatureDial from "./FeatureDial";

function Features({ featureList, index, ...props }) {
  return (
    <ButtonContainer>
      {featureList.map((feature, idx) => (
        feature.dial ? (
          <FeatureDial
            key={idx}
            url={feature.url}
            imgUrl={feature.imgUrl}
            text={feature.text}
            alt={feature.alt}
            index={index}
            dial={feature.dial}
            {...props}
          />) : (
          <FeatureButton
            key={idx}
            url={feature.url}
            imgUrl={feature.imgUrl}
            text={feature.text}
            alt={feature.alt}
            index={index}
            {...props}
          />
        )))}
    </ButtonContainer>
  );
}

export default Features;
