///// Navigation

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

/////////////////////////////////////////// Companies Filtering
const companies = [
    {
        id: 1,
        company: 'Digitain',
        industry: 'Information technologies',
        number_empolyees: 5000,
        job_type: 'Part Time',
        location: 'Yerevan',
        applyLink: 'apply_link1'
    },
    {
        id: 2,
        company: 'Picsart Academy',
        industry: 'Information technologies',
        number_empolyees: 10000,
        job_type: 'Full Time',
        location: 'Gyumri',
        applyLink: 'apply_link2'
    },
    {
        id: 3,
        company: 'TotoGaming',
        industry: 'Sport/Betting',
        number_empolyees: 20000,
        job_type: 'Part Time',
        location: 'Yerevan',
        applyLink: 'apply_link3'
    },
    {
        id: 4,
        company: 'Atenk Ltd',
        industry: 'Mining/Manufacturing/Production',
        number_empolyees: 15000,
        job_type: 'Part Time',
        location: 'Yerevan',
        applyLink: 'apply_link4'
    },
];


document.addEventListener('DOMContentLoaded', function () {
    displayCompanies(companies);

    const categoryButtons = document.querySelectorAll('.fil-p');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const subcategories = this.nextElementSibling;
            toggleSubcategories(subcategories);
        });
    });

    const subcategoryButtons = document.querySelectorAll('.sub-fil-p');
    subcategoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterType = this.dataset.filterType;
            const filterValue = this.textContent;
            filterItems(filterType, filterValue);
        });
    });

    document.getElementById("searchBar").addEventListener("input", function () {
        var keyword = this.value.trim().toLowerCase();

        var companyListings = document.querySelectorAll(".companies-listings ul li");

        companyListings.forEach(function (companyListing) {
            var companyName = companyListing.querySelector("h3").textContent.toLowerCase();
            if (companyName.includes(keyword)) {
                companyListing.style.display = "block";
            } else {
                companyListing.style.display = "none";
            }
        });
    });
});

function toggleSubcategories(subcategories) {
    subcategories.style.display = subcategories.style.display === 'none' ? 'block' : 'none';
}

function filterItems(filterType, filter) {
    let filteredCompanies = companies;
    switch (filterType) {
        case 'industry':
            filteredCompanies = filteredCompanies.filter(company => company.industry === filter);
            break;
        case 'number_empolyees':
            const [lowerBound, upperBound] = filter.split(' to ').map(val => parseInt(val));
            filteredCompanies = filteredCompanies.filter(company =>
                company.number_empolyees >= lowerBound && company.number_empolyees <= upperBound
            );
            break;
        case 'job_type':
            filteredCompanies = filteredCompanies.filter(company => company.job_type === filter);
            break;
        case 'location':
            filteredCompanies = filteredCompanies.filter(company => company.location === filter);
            break;
        default:
            break;
    }
    displayCompanies(filteredCompanies);
}

function displayCompanies(companies) {
    const companyList = document.querySelector('.companies-listings ul');
    companyList.innerHTML = '';

    companies.forEach(company => {
        const companyItem = document.createElement('li');
        companyItem.innerHTML = `
            <h3>${company.company}</h3>
            <p>Industry: ${company.industry}</p>
            <p>Number of Employees: ${company.number_empolyees}</p>
            <p>Job Type: ${company.job_type}</p>
            <p>Location: ${company.location}</p>
            <a href="${company.applyLink}" target="_blank">To Company</a>
        `;
        companyList.appendChild(companyItem);
    });
}
























