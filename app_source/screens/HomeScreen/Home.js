import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message"; // Đảm bảo import đúng
// import jwtDecode from "jwt-decode";
import { Feather } from "@expo/vector-icons"; // Sử dụng @expo/vector-icons
import HomeStyles from "./HomeStyles"; // Import styles từ file HomeStyles
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  // useEffect(() => {
  //   const accessToken = "your-token-from-storage"; // Thay bằng cách lấy từ AsyncStorage nếu cần
  //   if (!accessToken) return;
  //   try {
  //     const decoded = jwtDecode(accessToken);
  //     const accountName = decoded?.AccountName;
  //     if (accountName) {
  //       Toast.show({
  //         type: "success",
  //         text1: `Welcome, ${accountName}!`,
  //         position: "top",
  //         autoHide: true,
  //         visibilityTime: 5000,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Invalid token", error);
  //   }
  // }, []);

  const carouselItems = [
    {
      image: "https://images6.alphacoders.com/138/1382889.png",
      title: "Welcome to CCSS",
      description: "Your Ultimate Cosplay Experience Awaits",
    },
    {
      image: "https://i.redd.it/6c8eg4156bi61.jpg",
      title: "Hire Cosplayers",
      description: "Connect with professional cosplayers for events",
    },
    {
      image:
        "https://pbs.twimg.com/media/C7cepMUVwAACO-C?format=jpg&name=4096x4096",
      title: "Event Organization",
      description: "Making Your Cosplay Events Unforgettable",
    },
    {
      image:
        "https://neotokyoproject.com/wp-content/uploads/2022/11/IMG_20221125_140104.jpg",
      title: "Event Registration",
      description: "Buy a ticket now to meet your idol!",
    },
    {
      image:
        "https://i.redd.it/my-2b-cosplay-photoart-kmitenkova-small-medium-biped-3d-v0-os0y07ka9g1d1.jpg?width=1920&format=pjpg&auto=webp&s=6c962da48b1e7b0807c7f147a30238a47e89cab4",
      title: "Professional Costume Rentals",
      description: "High-Quality Costumes for Every Character",
    },
    {
      image:
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ab0b473b-3434-4d5b-ac4b-82407c923ef4/dduw89a-c9e95780-4262-4318-add1-c059e13742c9.jpg/v1/fill/w_1920,h_640,q_75,strp/my_sh_figuarts_dragon_ball_collection_by_anubis_007_dduw89a-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQwIiwicGF0aCI6IlwvZlwvYWIwYjQ3M2ItMzQzNC00ZDViLWFjNGItODI0MDdjOTIzZWY0XC9kZHV3ODlhLWM5ZTk1NzgwLTQyNjItNDMxOC1hZGQxLWMwNTllMTM3NDJjOS5qcGciLCJ3aWR0aCI6Ijw9MTkyMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.vrrjAksbryuw9s7HQ11Jv_JJhtn85pImQer7lXOj_aQ",
      title: "Buy Souvenirs",
      description: "Find unique and memorable gifts for any occasion",
    },
  ];

  const featuredCharacters = [
    {
      id: 1,
      name: "Yanfei-Genshin",
      category: "Game",
      image:
        "https://th.bing.com/th/id/R.6f429d36ffe66cf79ee313893878eafc?rik=Fe%2bttJax2rzlkw&pid=ImgRaw&r=0",
    },
    {
      id: 2,
      name: "Naruto Uzumaki",
      category: "Anime",
      image:
        "https://i0.wp.com/ic.pics.livejournal.com/mnarutocosplay/65073251/13297/13297_original.jpg",
    },
    {
      id: 3,
      name: "Spider-Man",
      category: "Superhero",
      image:
        "https://i.etsystatic.com/6131164/r/il/364ff6/3627265229/il_fullxfull.3627265229_7wua.jpg",
    },
    {
      id: 4,
      name: "Wonder Woman",
      category: "Superhero",
      image:
        "https://th.bing.com/th/id/OIP.1B088_74plokyoy-o7KI9gHaLH?rs=1&pid=ImgDetMain",
    },
    {
      id: 5,
      name: "Tanjiro Kamado",
      category: "Anime",
      image:
        "https://preview.redd.it/tanjiro-kamado-cosplay-by-me-orion-v0-m6ydv6bvkscc1.jpeg?width=1080&crop=smart&auto=webp&s=c6587a373a9f90505eac9bd72dac5d7309403548",
    },
    {
      id: 6,
      name: "Master Chief",
      category: "Game",
      image:
        "https://i.pinimg.com/originals/7d/95/66/7d9566482e181ef42d96c249f136f38c.jpg",
    },
  ];

  const services = [
    {
      title: "Hire Cosplayers",
      description:
        "Connect with talented cosplayers for your events and photoshoots.",
      icon: <Feather name="users" size={40} color="#fff" />,
    },
    {
      title: "Event Organize",
      description:
        "Professional event organization services to bring your cosplay vision to life.",
      icon: <Feather name="calendar" size={40} color="#fff" />,
    },
    {
      title: "Costume Rental",
      description:
        "High-quality costumes for your favorite characters, ensuring perfect fit and authentic details.",
      icon: <Ionicons name="shirt-outline" size={40} color="#fff" />,
    },

    {
      title: "Buy Souvenirs",
      description: "",
      icon: <Feather name="gift" size={40} color="#fff" />,
    },
    {
      title: "Event Ticket",
      description: "",
      icon: <Ionicons name="ticket-outline" size={40} color="#fff" />,
    },
  ];

  const renderCarouselItem = ({ item }) => (
    <View style={HomeStyles.carouselItem}>
      <Image source={{ uri: item.image }} style={HomeStyles.carouselImage} />
      <LinearGradient
        colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0.6)"]}
        style={HomeStyles.carouselCaption}
      >
        <Text style={HomeStyles.carouselTitle}>{item.title}</Text>
        <Text style={HomeStyles.carouselDescription}>{item.description}</Text>
      </LinearGradient>
    </View>
  );

  const renderCharacterItem = ({ item }) => (
    <TouchableOpacity style={HomeStyles.characterCard}>
      <Image source={{ uri: item.image }} style={HomeStyles.characterImage} />
      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.7)"]}
        style={HomeStyles.characterContent}
      >
        {/* <Text style={HomeStyles.characterName}>{item.name}</Text>
        <Text style={HomeStyles.categoryBadge}>{item.category}</Text> */}
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity style={HomeStyles.serviceCard}>
      <LinearGradient
        colors={["#510545", "#22668a"]}
        style={HomeStyles.iconWrapper}
      >
        {item.icon}
      </LinearGradient>
      <Text style={HomeStyles.serviceTitle}>{item.title}</Text>
      {/* <Text style={HomeStyles.serviceDescription}>{item.description}</Text> */}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={HomeStyles.container}>
      {/* Carousel */}
      <FlatList
        data={carouselItems}
        renderItem={renderCarouselItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />

      {/* Featured Characters */}
      <View style={HomeStyles.featuredCharacters}>
        <Text style={HomeStyles.sectionTitle}>Highlight Cosplayer</Text>
        <FlatList
          data={featuredCharacters}
          renderItem={renderCharacterItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity
          style={HomeStyles.viewAllButton}
          onPress={() => navigation.navigate("Cosplayer")}
        >
          <Text style={HomeStyles.viewAllText}>Hire Cosplayers</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Services */}
      <View style={HomeStyles.featuredServices}>
        <Text style={HomeStyles.sectionTitle}>Featured Services</Text>
        <View style={HomeStyles.serviceList}>
          {services.map((service, index) => (
            <View key={index}>{renderServiceItem({ item: service })}</View>
          ))}
        </View>
        {/* <TouchableOpacity style={HomeStyles.viewAllButton}>
          <Text style={HomeStyles.viewAllText}>View All Services</Text>
        </TouchableOpacity> */}
      </View>

      <Toast />
    </ScrollView>
  );
};

export default Home;
