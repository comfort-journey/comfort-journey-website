/**
 * Comfort Journey - Home Page Velo Script (Wix Velo / Dev Mode)
 * Website: https://www.comfortjourneyy.com/
 * Target: High Performance, UI/UX improvement, instant tour package filter, fast conversion widget.
 */

import { fetchTours, submitEnquiry } from 'backend/tours.jsw';
import wixLocation from 'wix-location';

$w.onReady(function () {
    initAnimatedCounters();
    setupTourQuickFilter();
    setupQuickBookingModal();
    setupWhatsAppDrawer();
});

/**
 * 1. Animated Stats Counter (30+ Years, 2000+ Destinations, 50k+ Happy Travelers)
 * Performance Optimized using viewport triggering & smooth 60fps animation
 */
function initAnimatedCounters() {
    const stats = [
        { id: "#counterYears", target: 30, suffix: "+" },
        { id: "#counterDestinations", target: 2000, suffix: "+" },
        { id: "#counterTravelers", target: 50000, suffix: "+" }
    ];

    stats.forEach(stat => {
        if ($w(stat.id).length) {
            $w(stat.id).onViewportEnter(() => {
                let startTimestamp = null;
                const duration = 1500; // 1.5 seconds

                function step(timestamp) {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    const currentVal = Math.floor(progress * stat.target);
                    
                    $w(stat.id).text = `${currentVal.toLocaleString()}${stat.suffix}`;
                    
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        $w(stat.id).text = `${stat.target.toLocaleString()}${stat.suffix}`;
                    }
                }

                requestAnimationFrame(step);
            });
        }
    });
}

/**
 * 2. Instant Tour Package Search & Filter (Debounced Execution)
 */
function setupTourQuickFilter() {
    let searchTimeout = null;

    const performSearch = async () => {
        const query = $w('#inputDestination')?.value || '';
        const category = $w('#dropdownCategory')?.value || 'All';
        
        $w('#tourLoader')?.show();
        try {
            const results = await fetchTours(query, category);
            if ($w('#repeaterTours').length) {
                $w('#repeaterTours').data = results;
            }
        } catch (err) {
            console.error("Error fetching tours:", err);
        } finally {
            $w('#tourLoader')?.hide();
        }
    };

    if ($w('#btnSearchTours').length) {
        $w('#btnSearchTours').onClick(performSearch);
    }

    if ($w('#inputDestination').length) {
        $w('#inputDestination').onInput(() => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(performSearch, 400);
        });
    }
}

/**
 * 3. Sticky Quick Enquiry Modal Handling
 */
function setupQuickBookingModal() {
    if ($w('#formEnquiry').length) {
        $w('#formEnquiry').onSubmit(async (event) => {
            const name = $w('#inputName')?.value?.trim();
            const phone = $w('#inputPhone')?.value?.trim();
            const destination = $w('#inputDestChoice')?.value?.trim();

            if (!name || !phone) {
                if ($w('#txtFormError').length) {
                    $w('#txtFormError').text = "Please enter your Name and Phone Number.";
                    $w('#txtFormError').show();
                }
                return;
            }

            if ($w('#btnSubmitForm').length) {
                $w('#btnSubmitForm').disable();
                $w('#btnSubmitForm').label = "Sending...";
            }

            const success = await submitEnquiry({ name, phone, destination });

            if (success) {
                if ($w('#txtFormSuccess').length) {
                    $w('#txtFormSuccess').text = "Thank you! Our travel expert will contact you in 15 minutes.";
                    $w('#txtFormSuccess').show();
                }
                if ($w('#txtFormError').length) {
                    $w('#txtFormError').hide();
                }
                $w('#formEnquiry').reset();
            } else {
                if ($w('#txtFormError').length) {
                    $w('#txtFormError').text = "Something went wrong. Please call +91 8770403315 directly.";
                    $w('#txtFormError').show();
                }
            }

            if ($w('#btnSubmitForm').length) {
                $w('#btnSubmitForm').enable();
                $w('#btnSubmitForm').label = "Book Now";
            }
        });
    }
}

/**
 * 4. WhatsApp & Direct Call Floating Drawer
 */
function setupWhatsAppDrawer() {
    if ($w('#btnFloatingWhatsApp').length) {
        $w('#btnFloatingWhatsApp').onClick(() => {
            const msg = encodeURIComponent("Hi Comfort Journey! I'm interested in planning a tour package. Please share details.");
            wixLocation.to(`https://wa.me/918770403315?text=${msg}`);
        });
    }
}

