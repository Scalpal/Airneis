import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay"; 

const testcaca = () => {
  const [emblaRef] = useEmblaCarousel({loop: true}, [Autoplay()]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide one">Slide 1</div>
        <div className="embla__slide two">Slide 2</div>
        <div className="embla__slide three">Slide 3</div>
      </div>
    </div>
  );
}; 
export default testcaca; 