loadAPI(6);

// Remove this if you want to be able to use deprecated methods without causing script to stop.
// This is useful during development.
// host.setShouldFailOnDeprecatedUse(true);

host.defineController("Fostex", "MixTAB", "0.1", "1d29bc68-43d1-4f71-957e-8946456d2f0b", "Tj Shredder");

host.defineMidiPorts(1, 1);

if (host.platformIsWindows())
{
   // TODO: Set the correct names of the ports for auto detection on Windows platform here
   // and uncomment this when port names are correct.
   // host.addDeviceNameBasedDiscoveryPair(["Input Port 0"], ["Output Port 0"]);
}
else if (host.platformIsMac())
{
   // TODO: Set the correct names of the ports for auto detection on Mac OSX platform here
   // and uncomment this when port names are correct.
   // host.addDeviceNameBasedDiscoveryPair(["Input Port 0"], ["Output Port 0"]);
}
else if (host.platformIsLinux())
{
   // TODO: Set the correct names of the ports for auto detection on Linux platform here
   // and uncomment this when port names are correct.
   // host.addDeviceNameBasedDiscoveryPair(["Input Port 0"], ["Output Port 0"]);
}

function init() {
   transport = host.createTransport();
   bank24 = host.createMainTrackBank(24, 3, 0);
   effectBank = host.createEffectTrackBank(3, 0);
   master = host.createMasterTrack(0);
   host.getMidiInPort(0).setMidiCallback(onMidi0);
   host.getMidiInPort(0).setSysexCallback(onSysex0);

   // TODO: Perform further initialization here.
   println("MixTAB initialized!");
}

// Called when a short MIDI message is received on MIDI input port 0.
function onMidi0(status, data1, data2) {
	if (status == 176) {
		if (data1 >= 16 && data1 < 24)
			if (data2 == 0) bank24.getItemAt(data1-16).mute().set(true);
   			else {
       			bank24.getItemAt(data1-16).mute().set(false);
       			bank24.getItemAt(data1-16).volume().value().set(data2 - 1, 160);
   			}
		else if (data1 >= 24 && data1 < 32) bank24.getItemAt(data1-24).pan().value().set(data2, 128);
		else if (data1 >= 32 && data1 < 40) bank24.getItemAt(data1-32).getSend(2).value().set(data2, 128);
		else if (data1 >= 40 && data1 < 48) bank24.getItemAt(data1-40).getSend(1).value().set(data2, 128);
		else if (data1 >= 66 && data1 < 74) {
			if (data2 >= 64) bank24.getItemAt(data1-66).monitor().set(true);
			else bank24.getItemAt(data1-66).monitor().set(false);
			bank24.getItemAt(data1-66).getSend(0).value().set(data2 % 64, 64);
		}
		else if (data1 == 7) master.volume().value().set(data2 - 1, 160);
		else if (data1 == 75) transport.metronomeVolume().set(data2 - 1, 160);
		else if (data1 == 76) effectBank.getItemAt(0).volume().value().set(data2 - 1, 160);
		else if (data1 == 77) effectBank.getItemAt(1).volume().value().set(data2 - 1, 160);
		else if (data1 == 48) effectBank.getItemAt(2).volume().value().set(data2, 161);
	}
	else if (status == 177) {
		if (data1 >= 16 && data1 < 24)
			if (data2 == 0) bank24.getItemAt(data1-8).mute().set(true);
   			else {
       			bank24.getItemAt(data1-8).mute().set(false);
       			bank24.getItemAt(data1-8).volume().value().set(data2 - 1, 160);
   			}
		else if (data1 >= 24 && data1 < 32) bank24.getItemAt(data1-16).pan().value().set(data2, 128);
		else if (data1 >= 32 && data1 < 40) bank24.getItemAt(data1-24).getSend(2).value().set(data2, 128);
		else if (data1 >= 40 && data1 < 48) bank24.getItemAt(data1-32).getSend(1).value().set(data2, 128);
		else if (data1 >= 66 && data1 < 74) {
			if (data2 >= 64) bank24.getItemAt(data1-58).monitor().set(true);
			else bank24.getItemAt(data1-58).monitor().set(false);
			bank24.getItemAt(data1-58).getSend(0).value().set(data2 % 64, 64);
		}
		else if (data1 == 7) master.volume().value().set(data2 - 1, 160);
		else if (data1 == 75) transport.metronomeVolume().set(data2 - 1, 160);
		else if (data1 == 76) effectBank.getItemAt(0).volume().value().set(data2 - 1, 160);
		else if (data1 == 77) effectBank.getItemAt(1).volume().value().set(data2 - 1, 160);
		else if (data1 == 48) effectBank.getItemAt(2).volume().value().set(data2, 161);
	}
	else if (status == 178) {
		if (data1 >= 16 && data1 < 24)
			if (data2 == 0) bank24.getItemAt(data1).mute().set(true);
   			else {
       			bank24.getItemAt(data1).mute().set(false);
       			bank24.getItemAt(data1).volume().value().set(data2 - 1, 160);
   			}
		else if (data1 >= 24 && data1 < 32) bank24.getItemAt(data1-8).pan().value().set(data2, 128);
		else if (data1 >= 32 && data1 < 40) bank24.getItemAt(data1-16).getSend(2).value().set(data2, 128);
		else if (data1 >= 40 && data1 < 48) bank24.getItemAt(data1-24).getSend(1).value().set(data2, 128);
		else if (data1 >= 66 && data1 < 74) {
			if (data2 >= 64) bank24.getItemAt(data1-50).monitor().set(true);
			else bank24.getItemAt(data1-50).monitor().set(false);
			bank24.getItemAt(data1-50).getSend(0).value().set(data2 % 64, 64);
		}
		else if (data1 == 7) master.volume().value().set(data2 - 1, 160);
		else if (data1 == 75) transport.metronomeVolume().set(data2 - 1, 160);
		else if (data1 == 76) effectBank.getItemAt(0).volume().value().set(data2 - 1, 160);
		else if (data1 == 77) effectBank.getItemAt(1).volume().value().set(data2 - 1, 160);
		else if (data1 == 48) effectBank.getItemAt(2).volume().value().set(data2, 161);
	}
//   println("status: " + status + ", data1: " + data1 + ", data2: " + data2);
}

// Called when a MIDI sysex message is received on MIDI input port 0.
function onSysex0(data) {
   // MMC Transport Controls:
   switch (data) {
      case "f07f7f0605f7":
         transport.rewind();
         break;
      case "f07f7f0604f7":
         transport.fastForward();
         break;
      case "f07f7f0601f7":
         transport.stop();
         break;
      case "f07f7f0602f7":
         transport.play();
         break;
      case "f07f7f0606f7":
         transport.record();
         break;
   }
}

function flush() {
   // TODO: Flush any output to your controller here.
}

function exit() {

}