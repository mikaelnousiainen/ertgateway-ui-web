/*
 * Embedded Radio Tracker
 *
 * Copyright (C) 2017 Mikael Nousiainen
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const testMessage = {
  id: 1,
  type: 1,
  timestamp_millis: 1495011961391,
  timestamp: '2017-05-17T09:06:01.391Z',
  device_name: 'Test device',
  device_model: 'Test model',
  gps: {
    has_fix: true,
    mode: '3D',
    satellites_visible: 10,
    satellites_used: 6,
    skyview_time_seconds: null,
    time: '2017-05-17T09:06:01.000Z',
    time_seconds: 1495011961.0,
    time_uncertainty_seconds: 0.0050000000000000001,
    latitude_degrees: 60.1699,
    latitude_uncertainty_meters: 22.515000000000001,
    longitude_degrees: 24.9384,
    longitude_uncertainty_meters: 11.711,
    altitude_meters: 33.630000000000003,
    altitude_uncertainty_meters: 137.77000000000001,
    track_degrees: 30.994299999999999,
    track_uncertainty_degrees: null,
    speed_meters_per_sec: 0.35199999999999998,
    speed_uncertainty_meters_per_sec: 1.1100000000000001,
    climb_meters_per_sec: 0.35199999999999998,
    climb_uncertainty_meters_per_sec: 275.54000000000002,
  },
  comm_devices: [
    {
      name: 'RFM9xW',
      model: 'SX127x/RFM9xW',
      manufacturer: 'Semtech/HopeRF',
      current_rssi: -98.0,
      last_received_packet_rssi: -28.0,
      transmitted_packet_count: 195,
      transmitted_bytes: 0,
      received_packet_count: 37,
      received_bytes: 538,
      invalid_received_packet_count: 0,
      frequency: 434250000.0,
      frequency_error: -4534.0426239999997,
      comm_protocol: {
        transmitted_packet_count: 195,
        transmitted_data_bytes: 47708,
        transmitted_payload_data_bytes: 46928,
        duplicate_transmitted_packet_count: 0,
        retransmitted_packet_count: 0,
        retransmitted_data_bytes: 0,
        retransmitted_payload_data_bytes: 0,
        received_packet_count: 0,
        received_data_bytes: 0,
        received_payload_data_bytes: 0,
        duplicate_received_packet_count: 0,
        received_packet_sequence_number_error_count: 0,
        invalid_received_packet_count: 0,
      },
    },
  ],
  sensor_modules: [
    {
      name: 'RTIMULib',
      sensors: [
        {
          id: 1,
          name: 'LPS25H',
          model: 'LPS25H',
          manufacturer: '',
          available: true,
          values: [
            {
              type: 19,
              label: 'Barometric pressure',
              unit: 'hPa',
              available: true,
              value: 1014.847412109375,
            },
            {
              type: 17,
              label: 'Temperature',
              unit: 'C',
              available: true,
              value: 28.852083206176758,
            },
            {
              type: 22,
              label: 'Altitude estimate',
              unit: 'm',
              available: true,
              value: -13.288722745008519,
            },
          ],
        },
        {
          id: 2,
          name: 'HTS221',
          model: 'HTS221',
          manufacturer: '',
          available: true,
          values: [
            {
              type: 18,
              label: 'Relative humidity',
              unit: '%',
              available: true,
              value: 22.480850219726562,
            },
            {
              type: 17,
              label: 'Temperature',
              unit: 'C',
              available: true,
              value: 29.843997955322266,
            },
          ],
        },
        {
          id: 3,
          name: 'LSM9DS1',
          model: 'LSM9DS1',
          manufacturer: '',
          available: true,
          values: [
            {
              type: 161,
              label: 'Accelerometer',
              unit: 'm/s^2',
              available: true,
              x: 0.44267216332405801,
              y: -0.3302094941612333,
              z: -9.8751781773030753,
            },
            {
              type: 164,
              label: 'Accelerometer residuals',
              unit: 'm/s^2',
              available: true,
              x: 1.4191916756302116,
              y: 2.3741011214137075,
              z: 0.46633214811384677,
            },
            {
              type: 20,
              label: 'Accelerometer magnitude',
              unit: 'm/s^2',
              available: true,
              value: 9.8906095551908013,
            },
            {
              type: 162,
              label: 'Gyroscope',
              unit: 'deg/s',
              available: true,
              x: 0.097438198038932528,
              y: 0.074140422780019033,
              z: -0.61695188454191696,
            },
            {
              type: 163,
              label: 'Magnetometer',
              unit: 'uT',
              available: true,
              x: 60.091953277587891,
              y: -70.885871887207031,
              z: -46.205570220947266,
            },
            {
              type: 21,
              label: 'Magnetometer magnitude',
              unit: 'uT',
              available: true,
              value: 103.78248596191406,
            },
            {
              type: 177,
              label: 'Orientation',
              unit: 'deg',
              available: true,
              x: 167.74400918493384,
              y: -10.944455215633836,
              z: 57.714948222446004,
            },
          ],
        },
      ],
    },
    {
      name: 'sysinfo',
      sensors: [
        {
          id: 1,
          name: 'sysinfo',
          model: 'sysinfo()',
          manufacturer: 'Linux',
          available: true,
          values: [
            {
              type: 66,
              label: 'System uptime',
              unit: 's',
              available: true,
              value: 418680.0,
            },
            {
              type: 67,
              label: 'Load average (1 minute)',
              unit: 'CPUs',
              available: true,
              value: 0.40087890625,
            },
            {
              type: 68,
              label: 'Memory used',
              unit: '%',
              available: true,
              value: 69.459439551304314,
            },
            {
              type: 69,
              label: 'Swap used',
              unit: '%',
              available: true,
              value: 2.0235165436149893,
            },
            {
              type: 70,
              label: 'Process count',
              unit: 'processes',
              available: true,
              value: 120.0,
            },
          ],
        },
      ],
    },
  ],
  related: [],
};

export function createTestMessage() {
  const msg = Object.assign({}, testMessage);
  msg.gps = Object.assign({}, msg.gps);

  testMessage.id += 1;
  testMessage.gps.longitude_degrees += 0.004 * Math.random();
  testMessage.gps.latitude_degrees -= 0.002 * Math.random();

  return msg;
}
