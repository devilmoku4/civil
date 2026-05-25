export default function SEOSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Adithi Construction",
    image: "https://adithi-construction.vercel.app/images/Adithi_Construction.jpg",
    description: "Premium civil engineering and luxury residential construction company",
    url: "https://adithi-construction.vercel.app",
    telephone: "+91 9380899473",
    email: "manusagar030@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mysore",
      addressLocality: "Mysore",
      addressRegion: "Karnataka",
      postalCode: "570001",
      addressCountry: "IN"
    },
    areaServed: ["Mysore", "Karnataka", "India"],
    priceRange: "₹₹₹",
    sameAs: ["https://www.instagram.com/adithi_construction_07/"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData)
      }}
    />
  );
}
