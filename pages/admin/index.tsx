import { Tabs } from "flowbite";
import type { TabsOptions, TabsInterface, TabItem } from "flowbite";

import AddSpot from "@/components/AddSpot";
import Invite from "@/components/Invite";

const AdminPage = () => {
  // create an array of objects with the id, trigger element (eg. button), and the content element
  // const tabElements: TabItem[] = [
  //   {
  //     id: "add-spot",
  //     triggerEl: document.querySelector("#add-spot-tab"),
  //     targetEl: document.querySelector("#add-spot-tab"),
  //   },
  //   {
  //     id: "invite",
  //     triggerEl: document.querySelector("#invite-tab"),
  //     targetEl: document.querySelector("#invite-tab"),
  //   },
  // ];

  // options with default values
  // const options: TabsOptions = {
  //   defaultTabId: "add-spot",
  //   activeClasses:
  //     "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500",
  //   inactiveClasses:
  //     "text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
  //   onShow: () => {
  //     console.log("tab is shown");
  //   },
  // };

  /*
   * tabElements: array of tab objects
   * options: optional
   */
  // const tabs: TabsInterface = new Tabs(tabElements, options);

  // open tab item based on id
  // tabs.show("contacts");

  // shows another tab element
  // tabs.show("dashboard");

  // get the tab object based on ID
  // tabs.getTab("contacts");

  // get the current active tab object
  // tabs.getActiveTab();

  return (
    // <div className="adminTabs w-640 m-auto">
    //   <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
    //     <ul
    //       className="flex flex-wrap -mb-px text-sm font-medium text-center"
    //       id="myTab"
    //       data-tabs-toggle="#myTabContent"
    //       role="tablist"
    //     >
    //       <li className="mr-2" role="presentation">
    //         <button
    //           className="inline-block p-4 border-b-2 rounded-t-lg"
    //           id="add-spot-tab"
    //           data-tabs-target="#add-spot"
    //           type="button"
    //           role="tab"
    //           aria-controls="add-spot"
    //           aria-selected="false"
    //         >
    //           Add spot
    //         </button>
    //       </li>
    //       <li className="mr-2" role="presentation">
    //         <button
    //           className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
    //           id="invite-tab"
    //           data-tabs-target="#invite"
    //           type="button"
    //           role="tab"
    //           aria-controls="invite"
    //           aria-selected="false"
    //         >
    //           Invite
    //         </button>
    //       </li>
    //     </ul>
    //   </div>
    //   <div id="myTabContent">
    //     <div
    //       className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
    //       id="add-spot"
    //       role="tabpanel"
    //       aria-labelledby="add-spot-tab"
    //     >
    //       <AddSpot />
    //     </div>
    //     <div
    //       className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
    //       id="invite"
    //       role="tabpanel"
    //       aria-labelledby="invite-tab"
    //     >
    //       <Invite />
    //     </div>
    //   </div>
    // </div>
    <div className="invite flex">
      <AddSpot />
    </div>
  );
};

export default AdminPage;
