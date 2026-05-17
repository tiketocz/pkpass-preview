import * as React from "react";

import { PassTransitType } from "./types";
declare module "./icons/air.svg";

// import { ReactComponent as GenericIcon } from './icons/generic.svg';
// import { ReactComponent as AirIcon } from './icons/air.svg';
// import { ReactComponent as BoatIcon } from './icons/boat.svg';
// import { ReactComponent as BusIcon } from './icons/bus.svg';
// import { ReactComponent as TrainIcon } from './icons/train.svg';

import generic from "./icons/air.svg";
import air from "./icons/air.svg";
import boat from "./icons/boat.svg";
import bus from "./icons/bus.svg";
import train from "./icons/train.svg";

export const TransitIcon = (props: { transitType?: PassTransitType }) => {
  // switch (props.transitType) {
  //   case PassTransitType.PKTransitTypeAir:
  //     return <AirIcon />;
  //   case PassTransitType.PKTransitTypeBoat:
  //     return <BoatIcon />;
  //   case PassTransitType.PKTransitTypeBus:
  //     return <BusIcon />;
  //   case PassTransitType.PKTransitTypeTrain:
  //     return <TrainIcon />;
  // }
  // return <GenericIcon />;
  switch (props.transitType) {
    case PassTransitType.PKTransitTypeAir:
      return <img id="pass-transport-type" src={air} alt="" />;
    case PassTransitType.PKTransitTypeBoat:
      return <img id="pass-transport-type" src={boat} alt="" />;
    case PassTransitType.PKTransitTypeBus:
      return <img id="pass-transport-type" src={bus} alt="" />;
    case PassTransitType.PKTransitTypeTrain:
      return <img id="pass-transport-type" src={train} alt="" />;
  }
  return <img id="pass-transport-type" src={generic} alt="" />;
};
