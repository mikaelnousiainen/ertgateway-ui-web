/*
 pa_boost: true,
 pa_output_power: 15,
 pa_max_power: 7,
 frequency: 434250000.0,
 implicit_header_mode: false,
 error_coding_rate: '4:5',
 bandwidth: '125K',
 spreading_factor: 7,
 crc: true,
 low_data_rate_optimize: false,
 expected_payload_length: 0,
 preamble_length: 8,
 iq_inverted: false,
 receive_timeout_symbols: 0,
 frequency_hop_enabled: false,
 frequency_hop_period: 0,
*/

export const trackerDeviceConfigTemplates = {
  c1_1: {
    name: '(default)',
    description: 'BW 125K, CR 4:5, SF7',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '125K',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '125K',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c1_2: {
    name: '',
    description: 'BW 62K5, CR 4:5, SF7',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '62K5',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '62K5',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c1_3: {
    name: '',
    description: 'BW 31K25, CR 4:5, SF7',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '31K25',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '31K25',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c1_4: {
    name: '',
    description: 'BW 250K, CR 4:5, SF7',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '250K',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '250K',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c2_1: {
    name: '',
    description: 'BW 125K, CR 4:5, SF8',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '125K',
            spreading_factor: 8,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '125K',
            spreading_factor: 8,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c2_2: {
    name: '',
    description: 'BW 62K5, CR 4:5, SF8',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '62K5',
            spreading_factor: 8,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '62K5',
            spreading_factor: 8,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c2_3: {
    name: '',
    description: 'BW 31K25, CR 4:5, SF8',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '31K25',
            spreading_factor: 8,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '31K25',
            spreading_factor: 8,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c2_4: {
    name: '',
    description: 'BW 250K, CR 4:5, SF8',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '250K',
            spreading_factor: 8,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '250K',
            spreading_factor: 8,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c3_1: {
    name: '',
    description: 'BW 125K, CR 4:5, SF9',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '125K',
            spreading_factor: 9,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '125K',
            spreading_factor: 9,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c3_2: {
    name: '',
    description: 'BW 62K5, CR 4:5, SF9',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '62K5',
            spreading_factor: 9,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '62K5',
            spreading_factor: 9,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c3_3: {
    name: '',
    description: 'BW 31K25, CR 4:5, SF9',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '31K25',
            spreading_factor: 9,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '31K25',
            spreading_factor: 9,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c3_4: {
    name: '',
    description: 'BW 250K, CR 4:5, SF9',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '250K',
            spreading_factor: 9,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '250K',
            spreading_factor: 9,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c4_1: {
    name: '',
    description: 'BW 125K, CR 4:6, SF7',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:6',
            bandwidth: '125K',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:6',
            bandwidth: '125K',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c4_2: {
    name: '',
    description: 'BW 62K5, CR 4:6, SF7',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:6',
            bandwidth: '62K5',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:6',
            bandwidth: '62K5',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c4_3: {
    name: '',
    description: 'BW 31K25, CR 4:6, SF7',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:6',
            bandwidth: '31K25',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:6',
            bandwidth: '31K25',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c4_4: {
    name: '',
    description: 'BW 250K, CR 4:6, SF7',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:6',
            bandwidth: '250K',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:6',
            bandwidth: '250K',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c5_1: {
    name: '',
    description: 'BW 125K, CR 4:8, SF7',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:8',
            bandwidth: '125K',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:8',
            bandwidth: '125K',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c5_2: {
    name: '',
    description: 'BW 62K5, CR 4:8, SF7',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:8',
            bandwidth: '62K5',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:8',
            bandwidth: '62K5',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c5_3: {
    name: '',
    description: 'BW 31K25, CR 4:8, SF7',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:8',
            bandwidth: '31K25',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:8',
            bandwidth: '31K25',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c5_4: {
    name: '',
    description: 'BW 250K, CR 4:8, SF7',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:8',
            bandwidth: '250K',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:8',
            bandwidth: '250K',
            spreading_factor: 7,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c6_1: {
    name: '',
    description: 'BW 125K, CR 4:5, SF10',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '125K',
            spreading_factor: 10,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '125K',
            spreading_factor: 10,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c6_2: {
    name: '',
    description: 'BW 62K5, CR 4:5, SF10',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '62K5',
            spreading_factor: 10,
            low_data_rate_optimize: false,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '62K5',
            spreading_factor: 10,
            low_data_rate_optimize: false,
          },
        },
      },
    },
  },
  c6_3: {
    name: '',
    description: 'BW 31K25, CR 4:5, SF10',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '31K25',
            spreading_factor: 10,
            low_data_rate_optimize: true,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '31K25',
            spreading_factor: 10,
            low_data_rate_optimize: true,
          },
        },
      },
    },
  },
  c6_4: {
    name: '',
    description: 'BW 125K, CR 4:5, SF12',
    config: {
      comm_devices: {
        rfm9xw: {
          transmit: {
            error_coding_rate: '4:5',
            bandwidth: '125K',
            spreading_factor: 12,
            low_data_rate_optimize: true,
          },
          receive: {
            error_coding_rate: '4:5',
            bandwidth: '125K',
            spreading_factor: 12,
            low_data_rate_optimize: true,
          },
        },
      },
    },
  },
};
