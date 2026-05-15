export default function Page() {
  return (
    <>
      {/*  SideNavBar  */}
<aside className="hidden md:flex flex-col bg-white dark:bg-slate-950 text-violet-600 dark:text-violet-400 font-['Plus_Jakarta_Sans'] antialiased h-screen w-64 sticky left-0 top-0 border-r border-slate-100 dark:border-slate-800 shadow-[8px_0_20px_rgba(139,92,246,0.04)] p-4 gap-2 z-50">
<div className="px-4 py-6 mb-2">
<h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Admin Central</h2>
<p className="text-sm text-slate-500 font-medium">Management Portal</p>
</div>
<nav className="flex flex-col gap-2 flex-1">
<a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-all duration-200 hover:translate-x-1" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-semibold">Dashboard</span>
</a>
{/*  Active Tab: User List  */}
<a className="flex items-center gap-3 px-4 py-3 bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 rounded-2xl font-semibold hover:translate-x-1 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="group" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
<span>User List</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-all duration-200 hover:translate-x-1" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-semibold">System Settings</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-all duration-200 hover:translate-x-1" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-semibold">My Profile</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-all duration-200 hover:translate-x-1" href="#">
<span className="material-symbols-outlined" data-icon="shield_lock">shield_lock</span>
<span className="font-semibold">Security</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-all duration-200 hover:translate-x-1 mt-auto" href="#">
<span className="material-symbols-outlined" data-icon="notifications_active">notifications_active</span>
<span className="font-semibold">Notifications</span>
</a>
</nav>
<div className="mt-4">
<button className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
        View Reports
      </button>
</div>
</aside>
{/*  Main Area  */}
<main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
{/*  TopAppBar  */}
<header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md text-violet-600 dark:text-violet-400 font-['Plus_Jakarta_Sans'] text-sm font-medium border-b border-slate-100 dark:border-slate-800 shadow-[0_4px_12px_rgba(139,92,246,0.05)] flex justify-between items-center w-full px-6 py-3 sticky top-0 z-40">
{/*  Left side: Brand & Search  */}
<div className="flex items-center gap-6 flex-1">
{/*  Mobile Menu Toggle (Visible only on mobile)  */}
<button className="md:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors active:scale-95 duration-150">
<span className="material-symbols-outlined">menu</span>
</button>
<span className="text-xl font-extrabold tracking-tight text-violet-600 dark:text-violet-400">FinKu</span>
<div className="hidden md:flex items-center bg-surface-container rounded-full px-4 py-2 max-w-md w-full focus-within:ring-2 focus-within:ring-primary-container transition-all">
<span className="material-symbols-outlined text-outline mr-2 text-[20px]" data-icon="search">search</span>
<input className="bg-transparent border-none focus:ring-0 text-on-surface w-full p-0 font-body-md text-body-md placeholder:text-outline-variant outline-none" placeholder="Search users by name or ID..." type="text"/>
</div>
</div>
{/*  Right side: Actions & Profile  */}
<div className="flex items-center gap-2">
<button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-full active:scale-95 duration-150">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors rounded-full active:scale-95 duration-150">
<span className="material-symbols-outlined" data-icon="help_outline">help_outline</span>
</button>
<div className="ml-4 w-9 h-9 rounded-full overflow-hidden border-2 border-surface-container-high shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
<img alt="Admin User Avatar" className="w-full h-full object-cover" data-alt="A professional headshot of a confident administrator wearing a neat blazer. The background is a bright, modern office space bathed in soft natural light, conveying a sense of organized, light-mode corporate elegance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW2D1_E2VdlmK7bQ_3_P_1RQFpmc4ZYPC6PGvYmNN5i0mbOIvC3LF2Wf56BbGzpg4IQXoFFn8bKziHnTMMLeVuFaD-4t9-Jmlas31QTid5jGkup_lTZhZ4hDSzCo_R0-1mUnti2qz8IRFCyR9qprv3dQP7yTHAVU6AUqMzEPNHHI4osKnL4NS_ALqK4oclS02qcBIh03xVX4cuQlTVcIFlInd3N5qpdaYEd5-heY8t3vGEwsi7PmMr5vKxz8BeuV7aGKgl-VB6ack"/>
</div>
</div>
</header>
{/*  Canvas / Page Content  */}
<div className="flex-1 overflow-y-auto p-margin-mobile md:p-xl scroll-smooth">
<div className="max-w-[1200px] mx-auto space-y-lg">
{/*  Page Header & Actions  */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-xl">
<div>
<h1 className="font-h1 text-h1 text-on-surface mb-1">User List</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Manage and review your active community members.</p>
</div>
<div className="flex items-center gap-3 w-full md:w-auto">
<button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-surface-container text-primary font-label-md text-label-md rounded-full hover:bg-surface-variant transition-colors shadow-sm">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
              Filters
            </button>
<button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary font-label-md text-label-md rounded-full hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
<span className="material-symbols-outlined text-[18px]">person_add</span>
              Add User
            </button>
</div>
</div>
{/*  Spacious User List Container (The "Data Table")  */}
<div className="bg-surface-container-lowest rounded-2xl shadow-[0_8px_24px_rgba(107,56,212,0.06)] overflow-hidden">
{/*  Column Headers (Hidden on Mobile)  */}
<div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-surface-container-low/50 border-b border-surface-variant/50">
<div className="col-span-4 font-label-md text-label-md text-on-surface-variant">Full Name</div>
<div className="col-span-2 font-label-md text-label-md text-on-surface-variant">User ID</div>
<div className="col-span-3 font-label-md text-label-md text-on-surface-variant">Email Address</div>
<div className="col-span-2 font-label-md text-label-md text-on-surface-variant">Join Date</div>
<div className="col-span-1 font-label-md text-label-md text-on-surface-variant text-right">Status</div>
</div>
{/*  List Body  */}
<div className="flex flex-col p-2">
{/*  Row Item 1  */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 hover:bg-surface-container-low/80 rounded-xl transition-colors cursor-pointer group">
{/*  Name & Avatar  */}
<div className="col-span-1 md:col-span-4 flex items-center gap-4">
<div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-surface-variant">
<img alt="Sarah Jenkins Avatar" className="w-full h-full object-cover" data-alt="A portrait of a cheerful young woman with blonde hair, smiling softly. The background is a muted pastel gradient, fitting perfectly into a clean, minimalist light-mode user interface aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjXD8cgHR9dIgrHBiiL3Z2F7X9a4u6FTOIIsdRyT8DSGM-mOHFI50ZvamlWCqDmnANoTheUbe8J3fpVW9HgE_z5eQKuXjFQ_QrUudW4nRLyNLxwWRWiFjHaLH30MQIAQqaD7uqsCUKJFYqwLnxRdz_w6twhYcqR4qdpUhkRfOGUCLvV6iEFPUd84fsmPK82upRVJBWPEn4JS3vHv-bEc9bnuVyDFxb6XgrdLfCjmFYYAmzNQxyNq4ik4n0UjUQmZCnipmkOcI7vQk"/>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Sarah Jenkins</p>
<p className="font-caption text-caption text-on-surface-variant md:hidden mt-0.5">ID: #USR-8472 • sarah.j@example.com</p>
</div>
</div>
{/*  Desktop Columns  */}
<div className="hidden md:block col-span-2 font-body-md text-body-md text-outline">
                #USR-8472
              </div>
<div className="hidden md:block col-span-3 font-body-md text-body-md text-on-surface-variant truncate">
                sarah.j@example.com
              </div>
<div className="hidden md:block col-span-2 font-body-md text-body-md text-on-surface-variant">
                Oct 12, 2023
              </div>
{/*  Status Badge  */}
<div className="col-span-1 flex justify-start md:justify-end">
<span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-md text-label-md whitespace-nowrap">
                  Active
                </span>
</div>
</div>
{/*  Row Item 2  */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 hover:bg-surface-container-low/80 rounded-xl transition-colors cursor-pointer group">
<div className="col-span-1 md:col-span-4 flex items-center gap-4">
<div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-surface-variant flex items-center justify-center text-primary-container font-h3">
                  MJ
                </div>
<div>
<p className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Marcus Johnson</p>
<p className="font-caption text-caption text-on-surface-variant md:hidden mt-0.5">ID: #USR-3921 • marcus.j@example.com</p>
</div>
</div>
<div className="hidden md:block col-span-2 font-body-md text-body-md text-outline">#USR-3921</div>
<div className="hidden md:block col-span-3 font-body-md text-body-md text-on-surface-variant truncate">marcus.j@example.com</div>
<div className="hidden md:block col-span-2 font-body-md text-body-md text-on-surface-variant">Nov 04, 2023</div>
<div className="col-span-1 flex justify-start md:justify-end">
<span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-md text-label-md whitespace-nowrap">
                  Active
                </span>
</div>
</div>
{/*  Row Item 3 (Inactive)  */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 hover:bg-surface-container-low/80 rounded-xl transition-colors cursor-pointer group opacity-75">
<div className="col-span-1 md:col-span-4 flex items-center gap-4">
<div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-surface-variant grayscale">
<img alt="David Chen Avatar" className="w-full h-full object-cover" data-alt="A portrait of a thoughtful young man looking slightly away from the camera. The image has lower contrast and a soft grey background, reflecting an inactive or quiet state within a clean interface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV5_IMUO8ybG43tUcugadCcQrY_gLoFaJgFYk-sWxR26zR5y-zoAxZnrTMvFCw8mr1byswDJkQb8WTPOBBUyp_Tuov8h5v4DMMg8HPgz69L3nwtz5WgXLGJss8gPD1u1p3eQcQoTZVfsOQs1xRRYJxvtz2kJmCLPaJ4qeSwirbW8DdlA-veT6ChcPo-V8kA0CRETGzOHM6MOpSLFpVuVKAz10mtytVcbVK5VEmgvhiK-s3UfZyb6L8cHpNxcdZvWHYncbVDAOqpLQ"/>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">David Chen</p>
<p className="font-caption text-caption text-on-surface-variant md:hidden mt-0.5">ID: #USR-1104 • d.chen99@example.com</p>
</div>
</div>
<div className="hidden md:block col-span-2 font-body-md text-body-md text-outline">#USR-1104</div>
<div className="hidden md:block col-span-3 font-body-md text-body-md text-on-surface-variant truncate">d.chen99@example.com</div>
<div className="hidden md:block col-span-2 font-body-md text-body-md text-on-surface-variant">Dec 18, 2023</div>
<div className="col-span-1 flex justify-start md:justify-end">
<span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant font-label-md text-label-md whitespace-nowrap">
                  Inactive
                </span>
</div>
</div>
{/*  Row Item 4  */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 hover:bg-surface-container-low/80 rounded-xl transition-colors cursor-pointer group">
<div className="col-span-1 md:col-span-4 flex items-center gap-4">
<div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-surface-variant">
<img alt="Elena Rodriguez Avatar" className="w-full h-full object-cover" data-alt="A bright headshot of a young woman with dark hair tied back, wearing a minimalist white shirt. The background is a clean, bright white studio setting, perfectly matching a spacious paper-on-cloud design theme." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHcszHucXBmSGuODGJYCDKah8fUs_92DjdTHEOM367N58qQCfRbC9Q1zI1EqICL8Y7tKsRggWySuNAUdJt1Iu6kEUp16DwG3PZ86P2CIu8TXsDHib1RIqP7QjKb3vY4q-5cU00JkqVD2KweEq2np87aZaiBhmBPIgNOUgKkZVJtbW4QT2unkgFQBjKn3MpOFoD7lDpuOy1THnti89_02VAy-gvPYa8vvb5hgvhahF9VIk7SkdRXPQZBnb_Wu8a0pbC8CQol0mxr2A"/>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors">Elena Rodriguez</p>
<p className="font-caption text-caption text-on-surface-variant md:hidden mt-0.5">ID: #USR-9932 • elena.r@example.com</p>
</div>
</div>
<div className="hidden md:block col-span-2 font-body-md text-body-md text-outline">#USR-9932</div>
<div className="hidden md:block col-span-3 font-body-md text-body-md text-on-surface-variant truncate">elena.r@example.com</div>
<div className="hidden md:block col-span-2 font-body-md text-body-md text-on-surface-variant">Jan 05, 2024</div>
<div className="col-span-1 flex justify-start md:justify-end">
<span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-md text-label-md whitespace-nowrap">
                  Active
                </span>
</div>
</div>
</div>
{/*  Footer / Pagination  */}
<div className="px-6 py-4 border-t border-surface-variant/30 flex items-center justify-between bg-surface-container-lowest">
<span className="font-caption text-caption text-on-surface-variant">Showing 1 to 4 of 248 users</span>
<div className="flex items-center gap-2">
<button className="w-8 h-8 flex items-center justify-center rounded-full text-outline hover:bg-surface-container-high transition-colors disabled:opacity-50" disabled>
<span className="material-symbols-outlined text-[20px]">chevron_left</span>
</button>
<button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md">1</button>
<button className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md">2</button>
<button className="w-8 h-8 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md">3</button>
<button className="w-8 h-8 flex items-center justify-center rounded-full text-outline hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-[20px]">chevron_right</span>
</button>
</div>
</div>
</div>
</div>
</div>
</main>
    </>
  );
}
