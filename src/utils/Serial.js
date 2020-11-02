const SerialPort = window.require("serialport");

const BAUDRATE = 115200;

export const getSerialPortPath = async () => {
  const ports = await SerialPort.list();
  var path = "";
  ports.forEach((port) => {
    if (port.manufacturer === "Arduino (www.arduino.cc)") {
      path = port.path;
    }
  });
  return path;
};

export const setSerialPort = async () => {
  const portPath = await getSerialPortPath();
  console.log(portPath);
  return new SerialPort(portPath, {
    baudRate: BAUDRATE,
  });
};
