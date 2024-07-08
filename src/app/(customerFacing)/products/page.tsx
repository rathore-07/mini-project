import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Suspense } from "react";

const productsData = [
  {
    id: "1",
    name: "Wireless Mouse",
    priceInCents: 2999,
    filePath: "/files/wireless_mouse.pdf",
    imagePath:
      "https://m.media-amazon.com/images/I/61LtuGzXeaL._AC_SL1500_.jpg",
    description: "A high precision wireless mouse.",
    isAvailableForPurchase: true,
    createdAt: "2024-07-09T10:00:00Z",
    updatedAt: null,
  },
  {
    id: "2",
    name: "Bluetooth Headphones",
    priceInCents: 4999,
    filePath: "/files/bluetooth_headphones.pdf",
    imagePath: "https://imgs.search.brave.com/2w9QMwynfXfejXjNGsgdyuYsFXPszh8mSaC8AzgjER4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NzI1MzYxNDcyNDgt/YWM1OWE4YWJmYTRi/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TVRaOGZH/SnNkV1YwYjI5MGFD/VXlNR2hsWVdSelpY/UjhaVzU4TUh4OE1I/eDhmREE9",
    description: "Noise cancelling over-ear Bluetooth headphones.",
    isAvailableForPurchase: true,
    createdAt: "2024-07-09T10:00:00Z",
    updatedAt: null,
  },
  {
    id: "3",
    name: "Smart Watch",
    priceInCents: 9999,
    filePath: "/files/smart_watch.pdf",
    imagePath:
      "https://m.media-amazon.com/images/I/71TJfNAlwbL._AC_SL1500_.jpg",
    description: "A stylish and functional smart watch.",
    isAvailableForPurchase: true,
    createdAt: "2024-07-09T10:00:00Z",
    updatedAt: null,
  },
  {
    id: "4",
    name: "Laptop Stand",
    priceInCents: 1999,
    filePath: "/files/laptop_stand.pdf",
    imagePath:
      "https://m.media-amazon.com/images/I/61HfQXv3BML._AC_SL1500_.jpg",
    description: "Adjustable laptop stand for better ergonomics.",
    isAvailableForPurchase: true,
    createdAt: "2024-07-09T10:00:00Z",
    updatedAt: null,
  },
  {
    id: "5",
    name: "USB-C Hub",
    priceInCents: 2499,
    filePath: "/files/usb_c_hub.pdf",
    imagePath:
      "https://m.media-amazon.com/images/I/71D9ImsvEtL._AC_SL1500_.jpg",
    description: "Multi-port USB-C hub for enhanced connectivity.",
    isAvailableForPurchase: true,
    createdAt: "2024-07-09T10:00:00Z",
    updatedAt: null,
  },
  {
    id: "6",
    name: "Portable Charger",
    priceInCents: 3499,
    filePath: "/files/portable_charger.pdf",
    imagePath:
      "https://m.media-amazon.com/images/I/61FQ4z1dTVL._AC_SL1500_.jpg",
    description: "High capacity portable charger for on-the-go power.",
    isAvailableForPurchase: true,
    createdAt: "2024-07-09T10:00:00Z",
    updatedAt: null,
  },
  {
    id: "7",
    name: "Mechanical Keyboard",
    priceInCents: 7499,
    filePath: "/files/mechanical_keyboard.pdf",
    imagePath:
      "https://m.media-amazon.com/images/I/71k9VAyWcjL._AC_SL1500_.jpg",
    description: "Tactile mechanical keyboard with customizable keys.",
    isAvailableForPurchase: true,
    createdAt: "2024-07-09T10:00:00Z",
    updatedAt: null,
  },
  {
    id: "8",
    name: "Webcam",
    priceInCents: 3999,
    filePath: "/files/webcam.pdf",
    imagePath:
      "https://m.media-amazon.com/images/I/61VfL-aiToL._AC_SL1500_.jpg",
    description: "High-definition webcam for video conferencing.",
    isAvailableForPurchase: true,
    createdAt: "2024-07-09T10:00:00Z",
    updatedAt: null,
  },
  {
    id: "9",
    name: "External Hard Drive",
    priceInCents: 6499,
    filePath: "/files/external_hard_drive.pdf",
    imagePath:
      "https://m.media-amazon.com/images/I/61IBtJb8EIL._AC_SL1500_.jpg",
    description: "1TB external hard drive for extra storage.",
    isAvailableForPurchase: true,
    createdAt: "2024-07-09T10:00:00Z",
    updatedAt: null,
  },
  {
    id: "10",
    name: "Gaming Mouse Pad",
    priceInCents: 1299,
    filePath: "/files/gaming_mouse_pad.pdf",
    imagePath:
      "https://m.media-amazon.com/images/I/71tZivLmNXL._AC_SL1500_.jpg",
    description: "Large gaming mouse pad with RGB lighting.",
    isAvailableForPurchase: true,
    createdAt: "2024-07-09T10:00:00Z",
    updatedAt: null,
  },
];

const getProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });
}, ["/products", "getProducts"]);

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </div>
  );
}

async function ProductsSuspense() {
  const products = productsData;

  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
