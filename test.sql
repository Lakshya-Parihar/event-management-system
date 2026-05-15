-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2025 at 11:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `password`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2y$10$EjVFvB9zLgfs8P1SSUXBkOOKYbYXVlwrZ.ASCOty9suwkywnlHrY.'),
(2, 'Arjun', 'arjun@gmail.com', '$2y$10$pfo6P4OFc80s/YjjPouteuQyyBAGnZQJ76nRXXp1rRvGBVfBjmXp.'),
(3, 'Suraj', 'suraj@gmail.com', '$2y$10$d8EM5AvuXAs1l4Fqer7LDOWWOU62k8CRl.hjvXW9L.EuMfA86h4k2'),
(4, 'Lakshya', 'lakshyaparihar@gmail.com', '$2y$10$bBSnh9yR1qiTYFXY.2wCKuk16EmEjlJdfcjm5EtBRy6z37oLhTIHS');

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `contactus`
--

INSERT INTO `contactus` (`id`, `name`, `email`, `phone`, `message`, `created_at`) VALUES
(1, 'Example1', 'example1@gmail.com', '1234567890', 'I would like to know more and receive a callback.', '2025-05-04 17:30:01'),
(5, 'Test', 'test@gmail.com', '9876543210', 'This is test. This is test.', '2025-05-07 14:56:26'),
(7, 'Anonymous', 'anonymous@gmail.com', '0987654323', 'This is an anonymous message from anonymous person.', '2025-05-11 14:09:21');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `short_description` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `date` date NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `venue` varchar(255) NOT NULL,
  `capacity` varchar(30) NOT NULL,
  `status` enum('upcoming','publish') NOT NULL DEFAULT 'upcoming',
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `short_description`, `description`, `date`, `category`, `image`, `created_at`, `venue`, `capacity`, `status`, `start_time`, `end_time`) VALUES
(1, 'Tech Conference 2025', 'A grand tech event!!', 'Welcome to Tech Conference 2025—a premier gathering of visionaries, innovators, developers, and tech enthusiasts from around the globe. This isn’t just another event—it’s a dynamic convergence of future-forward ideas, cutting-edge technologies, and influential minds shaping tomorrow\'s world.', '2025-09-07', 'Technology', 'uploads/Techconf-img-1.jpg', '2025-04-15 18:47:15', 'Gujarat University, Ahmedabad', '100', 'publish', '10:10:00', '15:00:00'),
(2, 'Music Festival', 'Live bands and fun!!', 'Feel the rhythm, embrace the energy, and let the music take over at the ultimate Music Festival—a full-day celebration of sound, spirit, and unforgettable moments! Whether you\'re a fan of indie rock, soulful blues, pop anthems, or electrifying EDM, this festival is your ticket to non-stop entertainment, live performances, and memories that will last a lifetime.', '2025-06-30', 'Music', 'uploads/music-event-1.jpg', '2025-04-15 18:47:15', 'Motera Stadium, Ahmedabad', '70000', 'publish', '06:00:00', '12:00:00'),
(3, 'Gamers Reunion', 'Exciting Games and Entertainment!! Thrilling Celebration of Gaming!!', 'Get ready for the ultimate gathering of gamers, streamers, and esports enthusiasts at Gamers Reunion—an action-packed event designed to unite the gaming community under one roof! Whether you\'re a casual gamer, a competitive player, or just someone who loves the gaming culture, this event promises an adrenaline-fueled day filled with intense matches, jaw-dropping entertainment, and unforgettable experiences.', '2025-07-10', 'Gaming', 'uploads/gaming-event-1.jpg', '2025-04-15 18:47:15', 'Asus Store Chandkheda, Ahmedabad', '250', 'upcoming', '12:00:00', '04:00:00'),
(4, 'Destination Wedding', 'A stunning beachfront wedding ceremony', 'Step into a fairytale where love meets the ocean breeze, and every moment feels like magic. Our Destination Wedding is not just an event—it’s an unforgettable experience set against the backdrop of a serene and breathtaking beachfront. This exclusive event is designed to offer a flawless blend of luxury, romance, and nature.', '2025-07-25', 'Wedding', 'uploads/wedding-event.jpg', '2025-04-23 05:49:38', 'Kovalam, Kerala', '1000', 'upcoming', '05:00:00', '20:26:00'),
(5, 'IPL Screening', 'Watch an IPL match on a Large screen.', 'Get ready for an electrifying evening of cricket, cheers, and unforgettable moments as we bring you IPL Screening like never before! Join us for an immersive live screening experience where fans unite to watch their favorite teams battle it out on a massive screen, surrounded by energy, excitement, and community spirit.', '2025-05-25', 'Screening', 'uploads/ipl-screening-event.jpg', '2025-04-23 06:17:34', 'Retro Cafe, near CBD Mall, Ahmdeabad', '200', 'publish', '07:30:00', '12:00:00'),
(6, 'Open Mic (Standup)', 'Got talent? We\'ve got the mic! All talents welcome!', 'Have a hidden talent you\'ve been dying to share? Whether you\'re a budding comedian, soulful singer, passionate poet, or a storyteller with flair — this is your stage! Our Open Mic Night is a celebration of creativity and expression, giving performers of all kinds the chance to shine in front of a lively, supportive audience.', '2025-06-15', 'Standup', 'uploads/standup-event.jpg', '2025-04-23 16:59:28', 'HK Arts & Commerce College, Ahmedabad', '50', 'publish', '06:00:00', '08:00:00'),
(24, 'BGMI Esports (LAN)', 'The ultimate BGMI Esports LAN showdown', 'Join us for an action-packed LAN showdown as top BGMI squads battle it out live! Experience the thrill, compete for prizes, and be part of the ultimate esports vibe. Don’t miss it!', '2025-05-29', 'Gaming', 'uploads/gaming-event-2.jpg', '2025-05-12 11:31:31', 'ABC Complex, Ahmedabad', '100', 'publish', '10:00:00', '18:00:00'),
(27, 'Hackathon 2025', 'Code. Create. Compete. Innovate in 24 hours.', 'Hackathon 2025 is a fast-paced, innovation-driven event that brings together talented developers, designers, and tech enthusiasts from across the region. Over the course of 24 hours, participants will form teams, brainstorm ideas, and build functional prototypes that address real-world challenges. With mentorship, workshops, and exciting prizes, Hackathon 2025 is the ultimate opportunity to network, learn, and showcase your skills in a competitive yet collaborative environment', '2025-06-20', 'Educational', 'uploads/hackathon-event-1.jpg', '2025-05-12 18:46:05', 'Silver Oak University, Ahmedabad', '100', 'upcoming', '09:00:00', '00:00:00'),
(28, 'The Flavors of Ahmedabad', 'Experience the Ultimate Celebration of Music, Shopping, and Food!', 'Get ready for The Flavors Of Ahmedabad a one-of-a-kind festival that brings together the best of live music, luxury shopping, delicious food, and vibrant displays! Whether you`re here for the beats, the brands, or the bites, this event promises an unforgettable experience for all. A Night of Fun, Shopping & Entertainment!', '2025-05-25', 'Food Fest', 'uploads/FoodFest-image-1.webp', '2025-05-13 06:13:57', 'Pramukh Swami Maharaj Shatabdi Mohotsav, Ahmedabad', '500', 'publish', '06:00:00', '12:00:00'),
(29, 'Baby Shower Celebration', 'Celebrate the joy of a new life with family and friends.', 'Join us for a heartwarming Baby Shower Celebration as we gather to bless the mother-to-be. With decorations, games, gifts, and delicious food, it\'s an evening full of laughter, joy, and precious memories. Hosted at home in a cozy setting with close friends and loved ones.', '2025-05-22', 'Family event', 'uploads/baby-Shower.png', '2025-05-13 08:16:52', 'ABC nagar, MG Road ,Muradabad ', '50', 'upcoming', '17:45:00', '21:49:00');

-- --------------------------------------------------------

--
-- Table structure for table `organizers`
--

CREATE TABLE `organizers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `organizers`
--

INSERT INTO `organizers` (`id`, `name`, `email`, `password`, `phone`, `gender`, `city`, `state`, `status`) VALUES
(2, 'Lakshya', 'lakshyaparihar@gmail.com', '$2y$10$5ZyWP/ekb7mm9i6dpSWXZ.Qb/UOfCJy6LTNdxySXsQsyPtqunR62G', '9023367397', 'male', 'Ahmedabad', 'Gujarat', 'Active'),
(3, 'Organizer1', 'org1@gmail.com', '$2y$10$Hm6EYR.zej81NeJd76X57e.XeMIJV7YZ7aQptqnPG6OotVeAXkQRi', '1234567890', 'female', 'Jaipur', 'Rajasthan', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `ticket_id` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `qr_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `user_id`, `event_id`, `ticket_id`, `price`, `date`, `qr_code`) VALUES
(1, 17, 5, 'TKT862721', 0.00, '2025-05-15', 'qr_codes/qr_68259a0a4a752.png'),
(2, 17, 28, 'TKT876873', 0.00, '2025-05-15', 'qr_codes/qr_68259ea49c693.png'),
(19, 17, 1, 'TKT587487', 0.00, '2025-05-15', 'qr_codes/qr_6825af35b685a.png'),
(20, 17, 24, 'TKT508474', 0.00, '2025-05-15', 'qr_codes/qr_6825b1c57abd5.png'),
(21, 17, 6, 'TKT104234', 0.00, '2025-05-15', 'qr_codes/qr_6825b2a2ec355.png'),
(22, 16, 24, 'TKT917385', 0.00, '2025-05-15', 'qr_codes/qr_6825b3e6c7af9.png'),
(23, 16, 2, 'TKT336301', 0.00, '2025-05-15', 'qr_codes/qr_6825b459982b5.png'),
(24, 16, 27, 'TKT130279', 0.00, '2025-05-15', 'qr_codes/qr_6825bb8685c86.png'),
(25, 15, 2, 'TKT337870', 0.00, '2025-05-16', 'qr_codes/qr_6826e1d5ba6c7.png'),
(26, 15, 28, 'TKT233809', 0.00, '2025-05-16', 'qr_codes/qr_6826ea2ab4889.png'),
(27, 15, 1, 'TKT271029', 0.00, '2025-05-16', 'qr_codes/qr_6826eaaa0c804.png'),
(28, 15, 5, 'TKT511645', 0.00, '2025-05-16', 'qr_codes/qr_6826fc31c91ea.png'),
(29, 15, 24, 'TKT361559', 0.00, '2025-05-16', 'qr_codes/qr_6827400e25fb6.png'),
(30, 20, 5, 'TKT660445', 0.00, '2025-05-17', 'qr_codes/qr_68280eedb5b26.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `gender`, `email`, `password`, `phone`, `city`, `state`, `status`) VALUES
(15, 'Arjun', 'male', 'arjun@gmail.com', '$2y$10$TJBwlceMKRpzLoJ8JdyThO1tJDnYGy45zX/CcKCmz9G/lJ/GeKaZK', '9876543210', 'Ahmedabad', 'Gujarat', 'Active'),
(16, 'Suraj ', 'male', 'suraj@gmail.com', '$2y$10$eOt9/AO6/FfbRcauLGN1eOs2fGw91pmWZIZfrtyGAX2Bx2ZUHZWdm', '1234567890', 'Ayodhya', 'Madhya Pradesh', 'Active'),
(17, 'Lakshya Parihar', 'male', 'lakshyaparihar@gmail.com', '$2y$10$Bs5ZGs3T1hlUbolTqxcv5OEgSgr3GafKVHopGiP9IXjXrwU3SD8xu', '9023367397', 'Ahmedabad', 'Gujarat', 'Active'),
(18, 'Test1', 'female', 'test1@gmail.com', '$2y$10$oRJpo0c.hgkCYDJVs4VacuzkYIXRERLGeWh6eJwX3NEsOFQFF14fG', '3745214903', 'Gandhinagar', 'Gujarat', 'Active'),
(19, 'Demo', 'female', 'demo@gmail.com', '$2y$10$dDkj509AwhF0Ri6fwvA2yex2N4WuKgo5LGeHHkprhCeCmgA96ASEW', '9876543210', 'Mumbai', 'Maharashtra', 'Active'),
(20, 'amit', 'male', 'amit123@gmail.com', '$2y$10$1SpDBa8kvi5vrfLJHX37f.g9mpid63K4.clOTsP0IroB2cAUI.Fwm', '123456789', 'Ahmedabad', 'gujrat', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organizers`
--
ALTER TABLE `organizers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ticket_id` (`ticket_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `organizers`
--
ALTER TABLE `organizers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
