import {
  HiOutlineArrowRightCircle,
  HiOutlineBeaker,
  HiOutlineBuildingOffice,
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClipboardDocumentList,
  HiOutlineCog6Tooth,
  HiOutlineCube,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineMagnifyingGlassCircle,
  HiOutlineShoppingCart,
  HiOutlineUserPlus,
  HiOutlineUsers,
} from 'react-icons/hi2';
import { GiMedicalThermometer, GiPadlock } from 'react-icons/gi';
import { MdOutlinePregnantWoman } from 'react-icons/md';

// Aliases for semantic naming
const HiOutlineClipboard = HiOutlineClipboardDocumentList;
const HiOutlineChatAlt2 = HiOutlineChatBubbleLeftRight;
const HiOutlineMicroscope = HiOutlineMagnifyingGlassCircle;

export const menuItems = [
  {
    title: 'Tableau de bord',
    icon: HiOutlineHome,
    path: '/dashboard',
  },
  {
    title: 'Gestion des patients',
    icon: HiOutlineUsers,
    items: [
      {
        title: 'Nouveau Patient',
        path: '/patients/new',
        icon: HiOutlineUserPlus,
      },
      { title: 'Tous les Patients', path: '/patients', icon: HiOutlineUsers },
    ],
  },
  {
    title: 'Consultations & Diagnostics',
    icon: HiOutlineClipboard,
    items: [
      {
        title: 'Nouvelle Consultation',
        path: '/consultations/new',
        icon: HiOutlineChatAlt2,
      },
      {
        title: 'Toutes les Consultations',
        path: '/consultations',
        icon: HiOutlineClipboard,
      },
      { title: 'Diagnostics', path: '/diagnostics', icon: HiOutlineMicroscope },
      {
        title: 'Prescriptions',
        path: '/prescriptions',
        icon: HiOutlineDocumentText,
      },
    ],
  },
  {
    title: 'Pharmacie & Stock',
    icon: HiOutlineBeaker,
    items: [
      {
        title: 'Nouvelle Fourniture',
        path: '/supplies/new',
        icon: HiOutlineShoppingCart,
      },
      { title: 'Medicaments', path: '/medicaments', icon: HiOutlineBeaker },
      { title: 'Gestion du stock', path: '/stock', icon: HiOutlineCube },
      {
        title: 'approvisionnements',
        path: '/approvisionnements',
        icon: HiOutlineBeaker,
      },
      { title: 'Ventes', path: '/sales', icon: HiOutlineShoppingCart },
    ],
  },
  {
    title: 'Rendez-vous & Planification',
    icon: HiOutlineCalendarDays,
    items: [
      {
        title: 'Rendez-vous',
        path: '/appointments',
        icon: HiOutlineCalendarDays,
      },
      {
        title: 'Vue du calendrier',
        path: '/calendar',
        icon: HiOutlineCalendarDays,
      },
    ],
  },
  {
    title: 'Hospitalisations',
    icon: HiOutlineBuildingOffice,
    items: [
      {
        title: 'Nouvelle Admission',
        path: '/hospitalizations/new',
        icon: HiOutlineBuildingOffice,
      },
      {
        title: 'Hospitalisations',
        path: '/hospitalizations',
        icon: HiOutlineBuildingOffice,
      },
    ],
  },
  {
    title: 'Soins de grossesse',
    icon: HiOutlineHeart,
    items: [
      { title: 'Grossesses', path: '/pregnancies', icon: HiOutlineHeart },
      {
        title: 'Etat de grossesse',
        path: '/etatgrossesse',
        icon: HiOutlineHeart,
      },
      {
        title: 'Types de grossesse',
        path: '/typesgrossesse',
        icon: MdOutlinePregnantWoman,
      },
      { title: 'Visites prénatales', path: '/prenatal', icon: HiOutlineHeart },
    ],
  },
  {
    title: 'Orientation',
    icon: HiOutlineArrowRightCircle,
    items: [
      {
        title: 'Références',
        path: '/etablissementsreferents',
        icon: HiOutlineArrowRightCircle,
      },
      {
        title: 'Librairie des services',
        path: '/services',
        icon: HiOutlineMicroscope,
      },
    ],
  },
  {
    title: 'Repertoire types',
    icon: HiOutlineArrowRightCircle,
    items: [
      {
        title: 'Types de maladies',
        path: '/typediseases',
        icon: HiOutlineMicroscope,
      },
      {
        title: "Types d'examens",
        path: '/typesexamens',
        icon: HiOutlineMicroscope,
      },
      {
        title: 'Types de consultations',
        path: '/typesconsultations',
        icon: HiOutlineMicroscope,
      },
      {
        title: 'Types de médicaments',
        path: '/typemedicines',
        icon: HiOutlineBeaker,
      },
    ],
  },

  {
    title: 'Administation',
    icon: HiOutlineCog6Tooth,
    items: [
      { title: 'Utilisateurs', path: '/users', icon: HiOutlineUsers },
      { title: 'Spécialités', path: '/specialties', icon: HiOutlineClipboard },
      { title: 'Quartiers', path: '/quartiers', icon: HiOutlineBuildingOffice },
      { title: 'Permissions', path: '/permissions', icon: GiPadlock },

      {
        title: 'Librairie de maladies',
        path: '/diseases',
        icon: HiOutlineMicroscope,
      },
      {
        title: 'Librairie des examens',
        path: '/examens',
        icon: HiOutlineMicroscope,
      },
      // {
      //   title: "Librairie d'examen",
      //   path: '/typesexamens',
      //   icon: GiMedicalThermometer,
      // },
      {
        title: 'Tarification',
        path: '/pricing',
        icon: HiOutlineCurrencyDollar,
      },
      { title: 'Paramètres', path: '/settings', icon: HiOutlineCog6Tooth },
    ],
  },
];
