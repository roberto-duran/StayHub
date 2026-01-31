import { Link } from '@inertiajs/react';
import { Facebook, Globe, Instagram, Twitter } from 'lucide-react';

/**
 * Footer component with 4-column link layout and social icons.
 * Includes language/currency selectors and copyright information.
 */
export function Footer() {
    return (
        <footer className="bg-stay-background-off border-t border-gray-200 py-12">
            <div className="max-w-[1440px] mx-auto px-6">
                {/* Link Columns */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="font-bold text-stay-text-main mb-4">Support</h4>
                        <ul className="space-y-3 text-stay-text-secondary text-sm">
                            <li>
                                <Link href="#" className="hover:underline">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    AirCover
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Anti-discrimination
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Disability support
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Cancellation options
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-stay-text-main mb-4">Hosting</h4>
                        <ul className="space-y-3 text-stay-text-secondary text-sm">
                            <li>
                                <Link href="#" className="hover:underline">
                                    StayHub your home
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    AirCover for Hosts
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Hosting resources
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Community forum
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Hosting responsibly
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-stay-text-main mb-4">StayHub</h4>
                        <ul className="space-y-3 text-stay-text-secondary text-sm">
                            <li>
                                <Link href="#" className="hover:underline">
                                    Newsroom
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    New features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Investors
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Gift cards
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-stay-text-main mb-4">Eco-Luxe</h4>
                        <ul className="space-y-3 text-stay-text-secondary text-sm">
                            <li>
                                <Link href="#" className="hover:underline">
                                    Our sustainability pledge
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Green certification
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Carbon offset program
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stay-text-secondary">
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                        <span>© {new Date().getFullYear()} StayHub, Inc.</span>
                        <span className="hidden md:inline">·</span>
                        <Link href="#" className="hover:underline">
                            Privacy
                        </Link>
                        <span className="hidden md:inline">·</span>
                        <Link href="#" className="hover:underline">
                            Terms
                        </Link>
                        <span className="hidden md:inline">·</span>
                        <Link href="#" className="hover:underline">
                            Sitemap
                        </Link>
                    </div>
                    <div className="flex items-center gap-4 font-semibold text-stay-text-main">
                        <button type="button" className="flex items-center gap-1 hover:underline">
                            <Globe className="h-4 w-4" />
                            English (US)
                        </button>
                        <button type="button" className="flex items-center gap-1 hover:underline">
                            $ USD
                        </button>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="opacity-80 hover:opacity-100 transition-opacity"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="opacity-80 hover:opacity-100 transition-opacity"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="#"
                                className="opacity-80 hover:opacity-100 transition-opacity"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
