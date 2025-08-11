export const LAST_CHECKED = "10 Aug 2025";

export const gpuData = [
    {
      brand:"NVIDIA", model:"GeForce RTX 4060", vram_gb:8, bus_bit:128, mem_type:"GDDR6",
      tgp_w:115, price_from:259.99,
      retailers:[
        {name:"OcUK 4060", url:"https://www.overclockers.co.uk/pc-components/graphics-cards/nvidia-graphics-cards/nvidia-geforce-rtx-4060-graphics-cards"},
        {name:"Scan search", url:"https://www.scan.co.uk/search?q=RTX%204060"},
        {name:"Ebuyer search", url:"https://www.ebuyer.com/store/Components/cat/Graphics-Cards-NVIDIA?search=rtx%204060"}
      ],
      notes:"1080p powerhouse.", marketed_for:["1080p gaming"]
    },
    {
      brand:"NVIDIA", model:"GeForce RTX 4060 Ti 16GB", vram_gb:16, bus_bit:128, mem_type:"GDDR6",
      tgp_w:165, price_from:490.94,
      retailers:[
        {name:"OcUK 4060 Ti 16G", url:"https://www.overclockers.co.uk/pc-components/graphics-cards/nvidia-graphics-cards/nvidia-geforce-rtx-4060-ti-16gb-graphics-cards"},
        {name:"Scan search", url:"https://www.scan.co.uk/search?q=RTX%204060%20Ti%2016GB"},
        {name:"PriceSpy UK", url:"https://pricespy.co.uk/search?search=RTX%204060%20Ti%2016GB"}
      ],
      notes:"Value 1440p / creator entry due to 16GB.", marketed_for:["1080p/1440p"]
    },
    {
      brand:"NVIDIA", model:"GeForce RTX 4070", vram_gb:12, bus_bit:192, mem_type:"GDDR6X",
      tgp_w:200, price_from:599.99,
      retailers:[
        {name:"OcUK 4070", url:"https://www.overclockers.co.uk/pc-components/graphics-cards/nvidia-graphics-cards/nvidia-geforce-rtx-4070"},
        {name:"Scan search", url:"https://www.scan.co.uk/search?q=RTX%204070"}
      ],
      notes:"Solid 1440p; can do 4K with DLSS.", marketed_for:["1440p gaming"]
    },
    {
      brand:"NVIDIA", model:"GeForce RTX 4070 SUPER", vram_gb:12, bus_bit:192, mem_type:"GDDR6X",
      tgp_w:220, price_from:589.99,
      retailers:[
        {name:"OcUK 4070 SUPER", url:"https://www.overclockers.co.uk/pc-components/graphics-cards/nvidia-graphics-cards/nvidia-geforce-rtx-4070-super"},
        {name:"Scan search", url:"https://www.scan.co.uk/search?q=RTX%204070%20SUPER"}
      ],
      notes:"Excellent 1440p; entry 4K.", marketed_for:["1440p","4K (entry)"]
    },
    {
      brand:"NVIDIA", model:"GeForce RTX 4070 Ti SUPER", vram_gb:16, bus_bit:256, mem_type:"GDDR6X",
      tgp_w:285, price_from:779.99,
      retailers:[
        {name:"OcUK 4070 Ti SUPER", url:"https://www.overclockers.co.uk/pc-components/graphics-cards/nvidia-graphics-cards/nvidia-geforce-rtx-4070-ti-super"},
        {name:"Scan search", url:"https://www.scan.co.uk/search?q=RTX%204070%20Ti%20SUPER"}
      ],
      notes:"High‑end 1440p/solid 4K.", marketed_for:["1440p","4K"]
    },
    {
      brand:"NVIDIA", model:"GeForce RTX 4080 SUPER", vram_gb:16, bus_bit:256, mem_type:"GDDR6X",
      tgp_w:320, price_from:989.99,
      retailers:[
        {name:"OcUK 4080 SUPER", url:"https://www.overclockers.co.uk/pc-components/graphics-cards/nvidia-graphics-cards/nvidia-geforce-rtx-4080-super-graphics-cards"},
        {name:"Scan search", url:"https://www.scan.co.uk/search?q=RTX%204080%20SUPER"}
      ],
      notes:"4K card.", marketed_for:["4K gaming","creation"]
    },
    {
      brand:"NVIDIA", model:"GeForce RTX 4090", vram_gb:24, bus_bit:384, mem_type:"GDDR6X",
      tgp_w:450, price_from:1949.99,
      retailers:[
        {name:"OcUK 4090", url:"https://www.overclockers.co.uk/pc-components/graphics-cards/nvidia-graphics-cards/nvidia-geforce-rtx-4090"},
        {name:"Scan search", url:"https://www.scan.co.uk/search?q=RTX%204090"}
      ],
      notes:"Top‑tier 4K+; massive VRAM for creation/AI.", marketed_for:["4K/High‑refresh"]
    },

    { brand:"AMD", model:"Radeon RX 7600 XT 16GB", vram_gb:16, bus_bit:128, mem_type:"GDDR6",
      tgp_w:190, price_from:299.99,
      retailers:[
        {name:"OcUK 7600 XT", url:"https://www.overclockers.co.uk/pc-components/graphics-cards/amd-graphics-cards/amd-radeon-rx-7600-xt-graphics-cards"},
        {name:"Scan search", url:"https://www.scan.co.uk/search?q=RX%207600%20XT"}
      ],
      notes:"Great value for 1080p/1440p (FSR).", marketed_for:["1440p (value)"]
    },
    { brand:"AMD", model:"Radeon RX 7700 XT", vram_gb:12, bus_bit:192, mem_type:"GDDR6",
      tgp_w:245, price_from:399.99,
      retailers:[
        {name:"Ebuyer 7700 XT", url:"https://www.ebuyer.com/store/Components/cat/Graphics-Cards-AMD/subcat/AMD-RX-7700-XT"},
        {name:"Scan search", url:"https://www.scan.co.uk/search?q=RX%207700%20XT"}
      ],
      notes:"1440p gaming sweet‑spot.", marketed_for:["1440p gaming"]
    },
    { brand:"AMD", model:"Radeon RX 7800 XT", vram_gb:16, bus_bit:256, mem_type:"GDDR6",
      tgp_w:263, price_from:429.98,
      retailers:[
        {name:"Scan 7800 XT", url:"https://www.scan.co.uk/shop/computer-hardware/all/gpu-amd-desktop/amd-radeon-rx-7800-xt-pci-express-graphics-cards"},
        {name:"PriceSpy UK", url:"https://pricespy.co.uk/search?search=RX%207800%20XT"}
      ],
      notes:"Strong 1440p; can do 4K with FSR.", marketed_for:["1440p","4K (entry)"]
    },
    { brand:"AMD", model:"Radeon RX 7900 XTX", vram_gb:24, bus_bit:384, mem_type:"GDDR6",
      tgp_w:355, price_from:799.99,
      retailers:[
        {name:"Scan 7900 XTX", url:"https://www.scan.co.uk/search?q=RX%207900%20XTX"},
        {name:"Ebuyer search", url:"https://www.ebuyer.com/store/Components/cat/Graphics-Cards-AMD?search=7900%20XTX"}
      ],
      notes:"Flagship raster; 4K gaming.", marketed_for:["4K gaming"]
    }
];

export const sources = [
    {title:"OcUK — RTX 4060 range (prices/spec)", url: gpuData[0].retailers[0].url},
    {title:"OcUK — RTX 4060 Ti 16GB (spec/prices)", url: gpuData[1].retailers[0].url},
    {title:"OcUK — RTX 4070 page (spec/prices)", url: gpuData[2].retailers[0].url},
    {title:"OcUK — RTX 4070 SUPER (price/spec)", url: gpuData[3].retailers[0].url},
    {title:"OcUK — RTX 4070 Ti SUPER (price)", url: gpuData[4].retailers[0].url},
    {title:"OcUK — RTX 4080 SUPER (price/spec)", url: gpuData[5].retailers[0].url},
    {title:"OcUK — RTX 4090 range (prices/spec)", url: gpuData[6].retailers[0].url},
    {title:"OcUK — RX 7600 XT (prices/spec)", url: gpuData[7].retailers[0].url},
    {title:"Ebuyer UK — RX 7700 XT (prices/spec)", url: gpuData[8].retailers[0].url},
    {title:"Scan UK — RX 7800 XT listings (prices)", url: gpuData[9].retailers[0].url},
    {title:"Scan UK — RX 7900 XTX search (prices)", url: gpuData[10].retailers[0].url}
];

export const quickChips = [
    {label:"Esports / 1080p", set:()=>({resolution: '1080', useCase: 'gaming', budget: 350})},
    {label:"1440p high", set:()=>({resolution: '1440', useCase: 'gaming', budget: 650})},
    {label:"4K ultra", set:()=>({resolution: '2160', useCase: 'gaming', budget: 1100})},
    {label:"Creator (16GB+)", set:()=>({useCase: 'creator', vram: '16', budget: 800})},
    {label:"AI (CUDA, 16–24GB)", set:()=>({useCase: 'ai', brand: 'NVIDIA', vram: '16', budget: 1200})},
];
