
import React from "react";
import { Building } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#contact" },
    ],
    services: [
      { name: "Buy Property", href: "#" },
      { name: "Sell Property", href: "#" },
      { name: "Rent Property", href: "#" },
      { name: "Property Management", href: "#" },
    ],
    resources: [
      { name: "Blog", href: "#" },
      { name: "Market Reports", href: "#" },
      { name: "Buyer's Guide", href: "#" },
      { name: "Seller's Guide", href: "#" },
    ],
    legal: [
      { name: "Terms & Conditions", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Accessibility", href: "#" },
    ],
  };

  return (
    <footer className="bg-estate-navy/95 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Building className="h-8 w-8 text-estate-gold" />
              <span className="font-montserrat text-xl font-bold">
                Estate<span className="text-estate-gold">Vision</span>
              </span>
            </a>
            <p className="text-white/70 mb-6 max-w-md">
              EstateVision is a premier real estate company specializing in luxury 
              properties and exceptional client experiences across the United States.
            </p>
            <div className="flex gap-4">
              {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="sr-only">{platform}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-estate-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-estate-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-estate-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm text-center md:text-left">
            &copy; {year} EstateVision. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/60 mt-4 md:mt-0">
            {footerLinks.legal.map((link, index) => (
              <React.Fragment key={link.name}>
                <a href={link.href} className="hover:text-white transition-colors">
                  {link.name}
                </a>
                {index < footerLinks.legal.length - 1 && (
                  <span className="text-white/30">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
