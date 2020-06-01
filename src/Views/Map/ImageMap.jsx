import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import PakImg from "../../Assets/Images/pakk-map.png";
import damPin from "../../Assets/mapPin.svg";
import "./ImageMap.css";

const markers = [
  {
    id: 1,
    key: "marker1",
    content: "Nowshera Dam",
    icon: damPin,
  },
  {
    id: 2,
    key: "marker2",
    content: "Head Marala",
    icon: damPin,
  },
  {
    id: 3,
    key: "marker3",
    content: "Kalabagh Dam",
    icon: damPin,
  },
  {
    id: 4,
    key: "marker4",
    content: "Mangala Dam",
    icon: damPin,
  },
  {
    id: 5,
    key: "marker5",
    content: "Mirani Dam",
    icon: damPin,
  },
  {
    id: 6,
    key: "marker6",
    content: "Rawal Dam",
    icon: damPin,
  },
  {
    id: 7,
    key: "marker7",
    content: "Tarbela Dam",
    icon: damPin,
  },
  {
    id: 8,
    key: "marker8",
    content: "Warsak Dam",
    icon: damPin,
  },
];

class ImageMap extends Component {
  constructor() {
    super();
    this.state = {
      popoverOpen1: false,
      popoverOpen2: false,
      popoverOpen3: false,
      popoverOpen4: false,
      popoverOpen5: false,
      popoverOpen6: false,
      popoverOpen7: false,
      popoverOpen8: false,
      mid: 1,
    };
  }

  toggle1 = () => {
    this.setState({ popoverOpen1: !this.state.popoverOpen1 });
  };

  toggle2 = () => {
    this.setState({ popoverOpen2: !this.state.popoverOpen2 });
  };

  toggle3 = () => {
    this.setState({ popoverOpen3: !this.state.popoverOpen3 });
  };

  toggle4 = () => {
    this.setState({ popoverOpen4: !this.state.popoverOpen4 });
  };

  toggle5 = () => {
    this.setState({ popoverOpen5: !this.state.popoverOpen5 });
  };

  toggle6 = () => {
    this.setState({ popoverOpen6: !this.state.popoverOpen6 });
  };

  toggle7 = () => {
    this.setState({ popoverOpen7: !this.state.popoverOpen7 });
  };

  toggle8 = () => {
    this.setState({ popoverOpen8: !this.state.popoverOpen8 });
  };
  render() {
    return (
      <div className="imagemap-container">
        <img className="image" src={PakImg} alt="pak-img" />
        <div className="markers-container">
          <div key={1} className="tooltip-div">
            <img
              id={"Popover-" + 1}
              src={damPin}
              className={`dampin-icon marker1`}
              alt="dam-pin"
            />
            <Popover
              placement="bottom"
              isOpen={this.state.popoverOpen1}
              target={"Popover-" + 1}
              toggle={() => this.toggle1()}
            >
              <PopoverHeader>{markers[0].content}</PopoverHeader>
              <PopoverBody>
                <Link to={"/charts/" + markers[0].content}>
                  See detailed Info...
                </Link>
              </PopoverBody>
            </Popover>
          </div>
          <div key={2} className="tooltip-div">
            <img
              id={"Popover-" + 2}
              src={damPin}
              className={`dampin-icon marker2`}
              alt="dam-pin"
            />
            <Popover
              placement="bottom"
              isOpen={this.state.popoverOpen2}
              target={"Popover-" + 2}
              toggle={() => this.toggle2()}
            >
              <PopoverHeader>{markers[1].content}</PopoverHeader>
              <PopoverBody>
                <Link to={"/charts/" + markers[1].content}>
                  See detailed Info...
                </Link>
              </PopoverBody>
            </Popover>
          </div>
          <div key={3} className="tooltip-div">
            <img
              id={"Popover-" + 3}
              src={damPin}
              className={`dampin-icon marker3`}
              alt="dam-pin"
            />
            <Popover
              placement="bottom"
              isOpen={this.state.popoverOpen3}
              target={"Popover-" + 3}
              toggle={() => this.toggle3()}
            >
              <PopoverHeader>{markers[2].content}</PopoverHeader>
              <PopoverBody>
                <Link to={"/charts/" + markers[2].content}>
                  See detailed Info...
                </Link>
              </PopoverBody>
            </Popover>
          </div>
          <div key={4} className="tooltip-div">
            <img
              id={"Popover-" + 4}
              src={damPin}
              className={`dampin-icon marker4`}
              alt="dam-pin"
            />
            <Popover
              placement="bottom"
              isOpen={this.state.popoverOpen4}
              target={"Popover-" + 4}
              toggle={() => this.toggle4()}
            >
              <PopoverHeader>{markers[3].content}</PopoverHeader>
              <PopoverBody>
                <Link to={"/charts/" + markers[3].content}>
                  See detailed Info...
                </Link>
              </PopoverBody>
            </Popover>
          </div>
          <div key={5} className="tooltip-div">
            <img
              id={"Popover-" + 5}
              src={damPin}
              className={`dampin-icon marker5`}
              alt="dam-pin"
            />
            <Popover
              placement="bottom"
              isOpen={this.state.popoverOpen5}
              target={"Popover-" + 5}
              toggle={() => this.toggle5()}
            >
              <PopoverHeader>{markers[4].content}</PopoverHeader>
              <PopoverBody>
                <Link to={"/charts/" + markers[4].content}>
                  See detailed Info...
                </Link>
              </PopoverBody>
            </Popover>
          </div>
          <div key={6} className="tooltip-div">
            <img
              id={"Popover-" + 6}
              src={damPin}
              className={`dampin-icon marker6`}
              alt="dam-pin"
            />
            <Popover
              placement="bottom"
              isOpen={this.state.popoverOpen6}
              target={"Popover-" + 6}
              toggle={() => this.toggle6()}
            >
              <PopoverHeader>{markers[5].content}</PopoverHeader>
              <PopoverBody>
                <Link to={"/charts/" + markers[5].content}>
                  See detailed Info...
                </Link>
              </PopoverBody>
            </Popover>
          </div>
          <div key={7} className="tooltip-div">
            <img
              id={"Popover-" + 7}
              src={damPin}
              className={`dampin-icon marker7`}
              alt="dam-pin"
            />
            <Popover
              placement="bottom"
              isOpen={this.state.popoverOpen7}
              target={"Popover-" + 7}
              toggle={() => this.toggle7()}
            >
              <PopoverHeader>{markers[6].content}</PopoverHeader>
              <PopoverBody>
                <Link to={"/charts/" + markers[6].content}>
                  See detailed Info...
                </Link>
              </PopoverBody>
            </Popover>
          </div>
          <div key={8} className="tooltip-div">
            <img
              id={"Popover-" + 8}
              src={damPin}
              className={`dampin-icon marker8`}
              alt="dam-pin"
            />
            <Popover
              placement="bottom"
              isOpen={this.state.popoverOpen8}
              target={"Popover-" + 8}
              toggle={() => this.toggle8()}
            >
              <PopoverHeader>{markers[7].content}</PopoverHeader>
              <PopoverBody>
                <Link to={"/charts/" + markers[7].content}>
                  See detailed Info...
                </Link>
              </PopoverBody>
            </Popover>
          </div>
          {/* {markers &&
            markers.map((m) => {
              return (
                <div key={m.id} className="tooltip-div">
                  <img id={"Popover-" + m.id} style={
                      mid===1?{display:"block"}:mid===2?"Popover-" + 2: mid===3?"Popover-" + 3:
                        mid===4?"Popover-" + 4 : mid===5?"Popover-" + 5: mid===6?"Popover-" + 6:
                        mid===7?"Popover-" + 7: mid===8?"Popover-" + 8 :
                        {
                            display:"none"
                        }
                    }  src={m.icon} className={`dampin-icon ${m.key}`} alt="dam-pin"
                   onClick={() => {
                        this.setState({mid: m.id });
                       this.toggle(m.id)
                       }}/>
                  <Popover
                    placement="bottom"
                    isOpen={mid===1?this.state.popoverOpen1:mid===2?this.state.popoverOpen2: mid===3?this.state.popoverOpen3:
                        mid===4?this.state.popoverOpen4 : mid===5?this.state.popoverOpen5: mid===6?this.state.popoverOpen6:
                        mid===7?this.state.popoverOpen7: mid===8?this.state.popoverOpen8 : false}
                    target={ "Popover-"+m.id}
                    //toggle={() => this.toggle(this.state.mid)}
                >
                    <PopoverHeader>{mid===1?markers[0].content:mid===2?markers[1].content: mid===3?markers[2].content:
                        mid===4?markers[3].content : mid===5?markers[4].content: mid===6?markers[5].content:
                        mid===7?markers[6].content: mid===8?markers[7].content : ""}</PopoverHeader>
                    <PopoverBody>
                    <Link to={mid===1?"/charts/"+ markers[0].content:mid===2?"/charts/"+ markers[1].content: mid===3?"/charts/"+ markers[2].content:
                        mid===4?"/charts/"+ markers[3].content : mid===5?"/charts/"+ markers[4].content: mid===6?"/charts/"+ markers[5].content:
                        mid===7?"/charts/"+ markers[6].content: mid===8?"/charts/"+ markers[7].content : ""}>See detailed Info...</Link>
                    </PopoverBody>
                </Popover>
                </div>
              );
            })}
 */}{" "}
        </div>
      </div>
    );
  }
}

export default ImageMap;
